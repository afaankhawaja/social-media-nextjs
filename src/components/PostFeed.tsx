// "use client";
// import { useSession, signIn } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";

// interface Comment {
//   content: string;
//   createdBy: string;
//   createdAt: string;
// }

// interface Post {
//   id: string;
//   content: string;
//   createdBy: string;
//   createdAt: string;
//   likes: number;
//   likedBy: string[];
//   comments: Comment[];
// }

// export default function PostFeed() {
//   const { data: session } = useSession();
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [commentInputVisible, setCommentInputVisible] = useState<string | null>(null);
//   const [newComment, setNewComment] = useState<{ [key: string]: string }>({});


//   useEffect(() => {
//     const fetchPosts = async () => {
//       const postsSnapshot = await getDocs(collection(db, "posts"));
//       const postsList = postsSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         likedBy: doc.data().likedBy || [],
//         comments: doc.data().comments || [],
//       })) as Post[];
  
//       // Sort posts by createdAt in descending order
//       const sortedPosts = postsList.sort((a, b) => 
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );
  
//       setPosts(sortedPosts);
//     };
  
//     fetchPosts();
//   }, []);

//   // const handleLikePost = async (postId: string, likedBy: string[]) => {
//   //   if (!session) {
//   //     signIn();
//   //     return;
//   //   }

//   //   const userEmail = session.user?.email || "Anonymous";
//   //   const postRef = doc(db, "posts", postId);

//   //   if (likedBy.includes(userEmail)) {
//   //     await updateDoc(postRef, {
//   //       likes: likedBy.length - 1,
//   //       likedBy: arrayRemove(userEmail),
//   //     });
//   //   } else {
//   //     await updateDoc(postRef, {
//   //       likes: likedBy.length + 1,
//   //       likedBy: arrayUnion(userEmail),
//   //     });
//   //   }

//   //   const postsSnapshot = await getDocs(collection(db, "posts"));
//   //   const postsList = postsSnapshot.docs.map(doc => ({
//   //     id: doc.id,
//   //     ...doc.data(),
//   //     likedBy: doc.data().likedBy || [],
//   //     comments: doc.data().comments || [],
//   //   })) as Post[];
//   //   setPosts(postsList);
//   // };
//   const handleLikePost = async (postId: string, likedBy: string[]) => {
//     if (!session) {
//       signIn();
//       return;
//     }
  
//     const userEmail = session.user?.email || "Anonymous";
//     const postRef = doc(db, "posts", postId);
  
//     if (likedBy.includes(userEmail)) {
//       await updateDoc(postRef, {
//         likes: likedBy.length - 1,
//         likedBy: arrayRemove(userEmail),
//       });
//     } else {
//       await updateDoc(postRef, {
//         likes: likedBy.length + 1,
//         likedBy: arrayUnion(userEmail),
//       });
//     }
  
//     // Re-fetch and sort posts after updating likes
//     const postsSnapshot = await getDocs(collection(db, "posts"));
//     const postsList = postsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       likedBy: doc.data().likedBy || [],
//       comments: doc.data().comments || [],
//     })) as Post[];
  
//     // Sort posts by createdAt in descending order
//     const sortedPosts = postsList.sort((a, b) => 
//       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );
  
//     setPosts(sortedPosts);
//   };
  
//   // const handleAddComment = async (postId: string) => {
//   //   if (!session) {
//   //     signIn();
//   //     return;
//   //   }

//   //   const comment = newComment[postId]?.trim();
//   //   if (!comment) {
//   //     alert("Comment cannot be empty!");
//   //     return;
//   //   }

//   //   const postRef = doc(db, "posts", postId);
//   //   await updateDoc(postRef, {
//   //     comments: arrayUnion({
//   //       content: comment,
//   //       createdBy: session.user?.email || "Anonymous",
//   //       createdAt: new Date().toISOString(),
//   //     }),
//   //   });

//   //   setNewComment(prev => ({ ...prev, [postId]: "" })); // Clear the comment input
//   //   setCommentInputVisible(null); // Hide the comment input

//   //   const postsSnapshot = await getDocs(collection(db, "posts"));
//   //   const postsList = postsSnapshot.docs.map(doc => ({
//   //     id: doc.id,
//   //     ...doc.data(),
//   //     likedBy: doc.data().likedBy || [],
//   //     comments: doc.data().comments || [],
//   //   })) as Post[];
//   //   setPosts(postsList);
//   // };
//   const handleAddComment = async (postId: string) => {
//     if (!session) {
//       signIn();
//       return;
//     }
  
//     const comment = newComment[postId]?.trim();
//     if (!comment) {
//       alert("Comment cannot be empty!");
//       return;
//     }
  
//     const postRef = doc(db, "posts", postId);
//     await updateDoc(postRef, {
//       comments: arrayUnion({
//         content: comment,
//         createdBy: session.user?.email || "Anonymous",
//         createdAt: new Date().toISOString(),
//       }),
//     });
  
//     setNewComment(prev => ({ ...prev, [postId]: "" })); // Clear the comment input
//     setCommentInputVisible(null); // Hide the comment input
  
//     // Re-fetch and sort posts after adding a comment
//     const postsSnapshot = await getDocs(collection(db, "posts"));
//     const postsList = postsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       likedBy: doc.data().likedBy || [],
//       comments: doc.data().comments || [],
//     })) as Post[];
  
//     // Sort posts by createdAt in descending order
//     const sortedPosts = postsList.sort((a, b) => 
//       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );
  
//     setPosts(sortedPosts);
//   };
  
//   const handleToggleCommentInput = (postId: string) => {
//     setCommentInputVisible(prev => (prev === postId ? null : postId));
//     if (commentInputVisible !== postId) {
//       setNewComment(prev => ({ ...prev, [postId]: "" })); // Clear the input when showing it
//     }
//   };

//   return (
//     <div className="post-feed space-y-4">
//       {posts.map((post) => (
//         <div key={post.id} className="border rounded-lg p-4 bg-white shadow-md space-y-2">
//           <p className="text-lg font-semibold">{post.content}</p>
//           <small className="text-gray-500">Created by: {post.createdBy}</small>
//           <div className="flex items-center justify-between">
//             <p className="text-gray-700">Likes: {post.likes}</p>
//             <div className="space-x-2">
//               {session && (
//                 <button
//                   onClick={() => handleLikePost(post.id, post.likedBy)}
//                   className="bg-green-500 text-white p-2 rounded-md"
//                 >
//                   {post.likedBy.includes(session.user?.email || "") ? "Unlike" : "Like"}
//                 </button>
//               )}
//               <button
//                 onClick={() => handleToggleCommentInput(post.id)}
//                 className="bg-gray-500 text-white p-2 rounded-md"
//               >
//                 Comment
//               </button>
//             </div>
//           </div>

//           {commentInputVisible === post.id && (
//             <div className="mt-2 space-y-2">
//               <input
//                 type="text"
//                 placeholder="Add a comment"
//                 value={newComment[post.id] || ""}
//                 onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
//                 className="p-2 border w-full rounded-md"
//               />
//               <button
//                 onClick={() => handleAddComment(post.id)}
//                 className="bg-blue-500 text-white p-2 rounded-md"
//               >
//                 Post Comment
//               </button>
//             </div>
//           )}

//           <div className="mt-4">
//             {post.comments.map((comment, index) => (
//               <div key={index} className="p-2 border-b">
//                 <p>{comment.content}</p>
//                 <small className="text-gray-500">Commented by: {comment.createdBy}</small>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";

interface Comment {
  content: string;
  createdBy: string;
  createdAt: string;
}

interface Post {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  createdByImage: string;  // To store the user's profile image
  likes: number;
  likedBy: string[];
  comments: Comment[];
}

export default function PostFeed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentInputVisible, setCommentInputVisible] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const postsList = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        likedBy: doc.data().likedBy || [],
        comments: doc.data().comments || [],
      })) as Post[];
  
      const sortedPosts = postsList.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  
      setPosts(sortedPosts);
    };
    
  
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);

    // Remove the deleted post from the state
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handleLikePost = async (postId: string, likedBy: string[]) => {
    if (!session) {
      signIn();
      return;
    }

    const userEmail = session.user?.email || "Anonymous";
    const postRef = doc(db, "posts", postId);

    if (likedBy.includes(userEmail)) {
      await updateDoc(postRef, {
        likes: likedBy.length - 1,
        likedBy: arrayRemove(userEmail),
      });
    } else {
      await updateDoc(postRef, {
        likes: likedBy.length + 1,
        likedBy: arrayUnion(userEmail),
      });
    }

    const postsSnapshot = await getDocs(collection(db, "posts"));
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      likedBy: doc.data().likedBy || [],
      comments: doc.data().comments || [],
    })) as Post[];
  
    const sortedPosts = postsList.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  
    setPosts(sortedPosts);
  };

  const handleAddComment = async (postId: string) => {
    if (!session) {
      signIn();
      return;
    }

    const comment = newComment[postId]?.trim();
    if (!comment) {
      alert("Comment cannot be empty!");
      return;
    }

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion({
        content: comment,
        createdBy: session.user?.email || "Anonymous",
        createdAt: new Date().toISOString(),
      }),
    });

    setNewComment(prev => ({ ...prev, [postId]: "" }));
    setCommentInputVisible(null);

    const postsSnapshot = await getDocs(collection(db, "posts"));
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      likedBy: doc.data().likedBy || [],
      comments: doc.data().comments || [],
    })) as Post[];

    const sortedPosts = postsList.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setPosts(sortedPosts);
  };
  const handleToggleCommentInput = (postId: string) => {
        setCommentInputVisible(prev => (prev === postId ? null : postId));
        if (commentInputVisible !== postId) {
          setNewComment(prev => ({ ...prev, [postId]: "" })); // Clear the input when showing it
        }
      };
      

  return (
    <div className="post-feed space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 bg-white shadow-md space-y-2">
          {/* Display post creator's small profile image and email */}
          <div className="flex items-center space-x-2">
            <img
              src={post.createdByImage || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <small className="text-gray-500">{post.createdBy}</small>
          </div>

          <p className="text-lg font-semibold">{post.content}</p>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Likes: {post.likes}</p>
            <div className="space-x-2">
              {session && (
                <button
                  onClick={() => handleLikePost(post.id, post.likedBy)}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  {post.likedBy.includes(session.user?.email || "") ? "Unlike" : "Like"}
                </button>
              )}
              <button
                onClick={() => handleToggleCommentInput(post.id)}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Comment
              </button>
              {/* Show delete button if the logged-in user created the post */}
              {session?.user?.email === post.createdBy && (
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {commentInputVisible === post.id && (
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment[post.id] || ""}
                onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                className="p-2 border w-full rounded-md"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Post Comment
              </button>
            </div>
          )}

          <div className="mt-4">
            {post.comments.map((comment, index) => (
              <div key={index} className="p-2 border-b">
                <p>{comment.content}</p>
                <small className="text-gray-500">Commented by: {comment.createdBy}</small>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
