// import PostFeed from '@/components/PostFeed'

// export default function Home() {
//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-4">
//       {/* Only displaying PostFeed now; the post creation form is handled inside PostFeed */}
//       <PostFeed />
//     </div>
//   )
// }
"use client";
import CreatePost from '@/components/CreatePost';
import PostFeed from '@/components/PostFeed';
import { useState } from 'react';

export default function Home() {
  const [refreshFeed, setRefreshFeed] = useState(0);

  const handlePostCreated = () => {
    setRefreshFeed(prev => prev + 1); // Force refresh by changing state
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <CreatePost onPostCreated={handlePostCreated} />
      <PostFeed key={refreshFeed} />
    </div>
  );
}
