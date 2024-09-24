// "use client";
// import { useState, useEffect } from "react";
// import { db } from "@/lib/firebase";
// import { useSession , signIn} from "next-auth/react";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// export default function Profile() {
//   const { data: session } = useSession();
//   const [userProfile, setUserProfile] = useState({
//     name: "",
//     email: "",
//     image: "",
//     bio: "",
//   });
//   const [editMode, setEditMode] = useState(false);

//   const defaultImage =
//     "https://www.example.com/default-profile-picture.png"; // Use a default profile image URL

//   useEffect(() => {
//     if (session) {
//       const fetchUserProfile = async () => {
//         const docRef = doc(db, "users", session.user?.email || "");
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserProfile(docSnap.data() as typeof userProfile);
//         } else {
//           setUserProfile({
//             name: session.user?.name || "",
//             email: session.user?.email || "",
//             image: session.user?.image || defaultImage,
//             bio: "",
//           });
//         }
//       };

//       fetchUserProfile();
//     }
//   }, [session]);

//   const handleSaveProfile = async () => {
//     if (session) {
//       const docRef = doc(db, "users", session.user?.email || "");
//       await setDoc(docRef, userProfile);
//       setEditMode(false);
//     }
//   };

//   return (
//     <>
//     {session?(<div className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-semibold mb-4">Profile</h1>
  
//         <div className="flex items-center space-x-4">
//           <img
//             src={userProfile.image || defaultImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border"
//           />
//           {editMode ? (
//             <Input
//               type="text"
//               value={userProfile.image}
//               onChange={(e) => setUserProfile({ ...userProfile, image: e.target.value })}
//               placeholder="Enter image URL"
//               className="w-full"
//             />
//           ) : null}
//         </div>
  
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           {editMode ? (
//             <Input
//               type="text"
//               value={userProfile.name}
//               onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
//             />
//           ) : (
//             <p>{userProfile.name}</p>
//           )}
//         </div>
  
//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <p>{userProfile.email}</p>
//         </div>
  
//         <div>
//           <label className="block text-sm font-medium">Bio</label>
//           {editMode ? (
//             <Textarea
//               value={userProfile.bio}
//               onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
//               placeholder="Add a short bio"
//             />
//           ) : (
//             <p>{userProfile.bio || "No bio provided."}</p>
//           )}
//         </div>
  
//         {editMode ? (
//           <Button onClick={handleSaveProfile} className="w-full">
//             Save Profile
//           </Button>
//         ) : (
//           <Button onClick={() => setEditMode(true)} className="w-full">
//             Edit Profile
//           </Button>
//         )}
//       </div>):(<>
//       <h1 className="text-center text-2xl mt-10">LogIn to see details</h1>
//       <div className="flex justify-center">
//       <Button className="text-center item-center justify-center w-1/3 mt-4" onClick={() => signIn('google')}>Login with Google</Button>
//       </div></>) }
//       </>
   
//   );
// }
/////

"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase"; // Add storage for image uploads
import { useSession, signIn } from "next-auth/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage functions
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Default image URL
const defaultImage = "https://www.example.com/default-profile-picture.png"; // Replace with a free image link

export default function Profile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    image: "",
    bio: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState<File | null>(null); // Handle file upload

  useEffect(() => {
    if (session) {
      const fetchUserProfile = async () => {
        const docRef = doc(db, "users", session.user?.email || "");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as typeof userProfile);
        } else {
          setUserProfile({
            name: session.user?.name || "",
            email: session.user?.email || "",
            image: session.user?.image || defaultImage,
            bio: "",
          });
        }
      };

      fetchUserProfile();
    }
  }, [session]);

  // Function to upload the image to Firebase storage and get the URL
  const handleImageUpload = async () => {
    if (file && session) {
      const imageRef = ref(storage, `profiles/${session.user?.email}/profile-image`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setUserProfile({ ...userProfile, image: downloadURL });
    }
  };

  // Save profile function
  const handleSaveProfile = async () => {
    if (session) {
      if (file) await handleImageUpload(); // Upload image if file is selected
      const docRef = doc(db, "users", session.user?.email || "");
      await setDoc(docRef, userProfile);
      setEditMode(false);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      {session ? (
        <div className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>

          {/* Profile Image Section */}
          <div className="flex items-center space-x-4">
            <img
              src={userProfile.image || defaultImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
            {editMode ? (
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            ) : null}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            {editMode ? (
              <Input
                type="text"
                value={userProfile.name}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, name: e.target.value })
                }
              />
            ) : (
              <p>{userProfile.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <p>{userProfile.email}</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium">Bio</label>
            {editMode ? (
              <Textarea
                value={userProfile.bio}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, bio: e.target.value })
                }
                placeholder="Add a short bio"
              />
            ) : (
              <p>{userProfile.bio || "No bio provided."}</p>
            )}
          </div>

          {/* Save or Edit Button */}
          {editMode ? (
            <Button onClick={handleSaveProfile} className="w-full">
              Save Profile
            </Button>
          ) : (
            <Button onClick={() => setEditMode(true)} className="w-full">
              Edit Profile
            </Button>
          )}
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl mt-10">Log in to see details</h1>
          <div className="flex justify-center">
            <Button
              className="text-center item-center justify-center w-1/3 mt-4"
              onClick={() => signIn("google")}
            >
              Log in with Google
            </Button>
          </div>
        </>
      )}
    </>
  );
}
