// "use client";
// import { useSession, signIn } from "next-auth/react";
// import { useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { Button} from "@/components/ui/button"; // Adjust this import as necessary
// import {Textarea } from "@/components/ui/textarea";
// export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
//   const { data: session } = useSession();
//   const [newPost, setNewPost] = useState("");

//   const handleCreatePost = async () => {
//     if (!session) {
//       signIn();
//       return;
//     }

//     if (newPost.trim() === "") {
//       alert("Post content cannot be empty!");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         content: newPost,
//         createdBy: session.user?.email || "Anonymous",
//         createdAt: new Date().toISOString(),
//         likes: 0,
//         likedBy: [],
//         comments: [],
//       });

//       setNewPost("");
//       onPostCreated(); // Call the function to refresh the feed
//     } catch (error) {
//       console.error("Error creating post: ", error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-4">
//       <Textarea
//         value={newPost}
//         onChange={(e) => setNewPost(e.target.value)}
//         placeholder="What's on your mind?"
//         className="p-2 border"
//       />
//       <Button onClick={handleCreatePost} className="bg-blue-500 text-white p-2">
//         Post
//       </Button>
//     </div>
//   );
// }
"use client";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button"; // Adjust this import as necessary
import { Textarea } from "@/components/ui/textarea";

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const { data: session } = useSession();
  const [newPost, setNewPost] = useState("");

  const handleCreatePost = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (newPost.trim() === "") {
      alert("Post content cannot be empty!");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        content: newPost,
        createdBy: session.user?.email || "Anonymous",
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: [],
        createdByImage: session.user?.image || "https://example.com/default-profile.png", // Store the user's profile image
      });

      setNewPost("");
      onPostCreated(); // Call the function to refresh the feed
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        className="p-2 border"
      />
      <Button onClick={handleCreatePost} className="bg-blue-500 text-white p-2">
        Post
      </Button>
    </div>
  );
}
