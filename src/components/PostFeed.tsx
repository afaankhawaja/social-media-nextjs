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
        createdByImage: session.user?.image || "https://via.placeholder.com/40", // Adding user's image
      }),
    });
  
    setNewComment(prev => ({ ...prev, [postId]: "" })); // Clear the comment input
    setCommentInputVisible(null); // Hide the comment input
  
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
  
  
  //   if (!session) {
  //     signIn();
  //     return;
  //   }

  //   const comment = newComment[postId]?.trim();
  //   if (!comment) {
  //     alert("Comment cannot be empty!");
  //     return;
  //   }

  //   const postRef = doc(db, "posts", postId);
  //   await updateDoc(postRef, {
  //     comments: arrayUnion({
  //       content: comment,
  //       createdBy: session.user?.email || "Anonymous",
  //       createdAt: new Date().toISOString(),
  //     }),
  //   });

  //   setNewComment(prev => ({ ...prev, [postId]: "" }));
  //   setCommentInputVisible(null);

  //   const postsSnapshot = await getDocs(collection(db, "posts"));
  //   const postsList = postsSnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //     likedBy: doc.data().likedBy || [],
  //     comments: doc.data().comments || [],
  //   })) as Post[];

  //   const sortedPosts = postsList.sort((a, b) => 
  //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   );

  //   setPosts(sortedPosts);
  // };
  const handleToggleCommentInput = (postId: string) => {
        setCommentInputVisible(prev => (prev === postId ? null : postId));
        if (commentInputVisible !== postId) {
          setNewComment(prev => ({ ...prev, [postId]: "" })); // Clear the input when showing it
        }
      };
      

  return (
//     <div className="post-feed space-y-6">
//   {posts.map((post) => (
//     <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//       <div className="p-4">
//         {/* Post header */}
//         <div className="flex items-center space-x-3 mb-4">
//           <img
//             src={post.createdByImage || "https://via.placeholder.com/40"}
//             alt="Profile"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <p className="font-semibold text-gray-900">{post.createdBy.split('@')[0]}</p>
//             <p className="text-sm text-gray-500">{post.createdBy}</p>
//           </div>
//         </div>

//         {/* Post content */}
//         <p className="text-gray-800 mb-4">{post.content}</p>

//         {/* Post actions */}
//         <div className="flex items-center justify-between text-gray-500">
//           <div className="flex items-center space-x-4">
//             {session && (
//               <button
//                 onClick={() => handleLikePost(post.id, post.likedBy)}
//                 className={`flex items-center space-x-1 ${
//                   post.likedBy.includes(session.user?.email || "") ? "text-pink-500" : "hover:text-pink-500"
//                 }`}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                 </svg>
//                 <span>{post.likes}</span>
//               </button>
//             )}
//             <button
//               onClick={() => handleToggleCommentInput(post.id)}
//               className="flex items-center space-x-1 hover:text-blue-500"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
//               </svg>
//               <span>{post.comments.length}</span>
//             </button>
//           </div>
//           {session?.user?.email === post.createdBy && (
//             <button
//               onClick={() => handleDeletePost(post.id)}
//               className="text-red-500 hover:text-red-600"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Comment section */}
//       {(commentInputVisible === post.id || post.comments.length > 0) && (
//         <div className="bg-gray-50 p-4 border-t border-gray-200">
//           {commentInputVisible === post.id && (
//             <div className="mb-4 flex space-x-2">
//               <input
//                 type="text"
//                 placeholder="Add a comment"
//                 value={newComment[post.id] || ""}
//                 onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
//                 className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={() => handleAddComment(post.id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
//               >
//                 Post
//               </button>
//             </div>
//           )}

//           <div className="space-y-3">
//             {post.comments.map((comment, index) => (
//               <div key={index} className="flex space-x-3">
//                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300"></div>
//                 <div className="flex-grow">
//                   <p className="text-sm font-medium text-gray-900">{comment.createdBy.split('@')[0]}</p>
//                   <p className="text-sm text-gray-700">{comment.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   ))}
// </div>
<div className="post-feed space-y-6">
  {posts.map((post) => (
    <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        {/* Post header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={post.createdByImage || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{post.createdBy.split('@')[0]}</p>
            <p className="text-sm text-gray-500">{post.createdBy}</p>
          </div>
        </div>

        {/* Post content */}
        <p className="text-gray-800 mb-4">{post.content}</p>

        {/* Post actions */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-4">
            {session && (
              <button
                onClick={() => handleLikePost(post.id, post.likedBy)}
                className={`flex items-center space-x-1 ${
                  post.likedBy.includes(session.user?.email || "") ? "text-pink-500" : "hover:text-pink-500"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{post.likes}</span>
              </button>
            )}
            <button
              onClick={() => handleToggleCommentInput(post.id)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{post.comments.length}</span>
            </button>
          </div>
          {session?.user?.email === post.createdBy && (
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-red-500 hover:text-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Comment section */}
      {(commentInputVisible === post.id || post.comments.length > 0) && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          {commentInputVisible === post.id && (
            <div className="mb-4 flex space-x-2">
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment[post.id] || ""}
                onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Post
              </button>
            </div>
          )}

          {/* Display comments */}
          <div className="space-y-3">
            {post.comments.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <img
                  src={(comment as any).createdByImage || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900">{comment.createdBy.split('@')[0]}</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ))}
</div>

  );
}
