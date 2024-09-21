"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUpIcon, MessageCircleIcon } from 'lucide-react'

interface Post {
  id: number
  content: string
  author: string
  likes: number
  comments: number
}

const samplePosts: Post[] = [
  { id: 1, content: "Hello, world!", author: "John Doe", likes: 10, comments: 2 },
  { id: 2, content: "This is a sample post.", author: "Jane Smith", likes: 5, comments: 1 },
]

const PostFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      {samplePosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <ThumbsUpIcon className="w-4 h-4 mr-2" />
              Like ({post.likes})
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircleIcon className="w-4 h-4 mr-2" />
              Comment ({post.comments})
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default PostFeed