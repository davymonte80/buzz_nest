"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { MessageCircle, Send } from "lucide-react"
import type { Comment } from "@/lib/types"

interface CommentsProps {
  postId: string
  comments: Comment[]
}

export function Comments({ postId, comments }: CommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          authorName,
          authorEmail,
          postId,
        }),
      })

      if (response.ok) {
        setNewComment("")
        setAuthorName("")
        setAuthorEmail("")
      }
    } catch (error) {
      console.error("Comment submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const approvedComments = comments.filter((comment) => comment.approved)

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-2xl font-bold">Comments ({approvedComments.length})</h3>
      </div>

      {/* Comment Form */}
      <div className="rounded-lg border bg-card p-6">
        <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your email (won't be published)"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              required
            />
          </div>
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            rows={4}
            className="resize-none"
          />
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {approvedComments.map((comment) => (
          <div key={comment.id} className="rounded-lg border bg-card p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{comment.authorName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{comment.authorName}</h4>
                  <time className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</time>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}

        {approvedComments.length === 0 && (
          <div className="text-center py-12 rounded-lg border bg-muted/30">
            <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  )
}
