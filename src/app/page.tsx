import PostFeed from '@/components/PostFeed'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Textarea placeholder="What's on your mind?" />
            <Button type="submit">Post</Button>
          </form>
        </CardContent>
      </Card>
      <PostFeed />
    </div>
  )
}