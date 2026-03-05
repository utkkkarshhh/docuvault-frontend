"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routeConfig"
import { MOCK_FEED_POSTS, formatDownloadDate } from "@/utils/mockData"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import toast from "react-hot-toast"

export default function FeedPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState({})
  const [newPostText, setNewPostText] = useState("")

  useEffect(() => {
    // Simulate loading feed posts
    setTimeout(() => {
      setPosts(MOCK_FEED_POSTS)
      setLoading(false)
    }, 500)
  }, [])

  const handleLike = (postId) => {
    setLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleCreatePost = () => {
    if (!newPostText.trim()) {
      toast.error("Please write something to post")
      return
    }

    const newPost = {
      id: posts.length + 1,
      author: {
        id: "current-user",
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser",
        role: "User",
      },
      title: newPostText.substring(0, 50),
      content: newPostText,
      timestamp: new Date(),
      category: "General",
      likes: 0,
      comments: 0,
    }

    setPosts([newPost, ...posts])
    setNewPostText("")
    toast.success("Post created successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            DocuVault
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate(ROUTES.SETTINGS)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Create Post Card */}
          <div className="card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Share with the Community</h2>
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind? Share tips, experiences, or ask questions..."
              className="w-full p-4 rounded-lg bg-input text-foreground placeholder:text-muted-foreground border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNewPostText("")}
                className="btn btn-secondary px-6 py-2"
              >
                Clear
              </button>
              <button
                onClick={handleCreatePost}
                className="btn btn-primary px-6 py-2"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-muted-foreground mb-4">No posts yet. Be the first to share!</p>
              <button
                onClick={handleCreatePost}
                className="btn btn-primary"
              >
                Create First Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="card space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDownloadDate(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Badge */}
                <div>
                  <span className="badge badge-secondary text-xs">
                    {post.category}
                  </span>
                </div>

                {/* Title and Content */}
                <div className="space-y-2">
                  {post.title && (
                    <h4 className="font-semibold text-lg text-foreground">{post.title}</h4>
                  )}
                  <p className="text-foreground leading-relaxed text-ellipsis-3">
                    {post.content}
                  </p>
                </div>

                {/* Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 border-t border-border pt-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      liked[post.id]
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={liked[post.id] ? "currentColor" : "none"} />
                    <span className="text-sm">{liked[post.id] ? post.likes + 1 : post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
