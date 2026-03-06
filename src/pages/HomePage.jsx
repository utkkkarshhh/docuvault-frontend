import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { Upload, Loader2, FileText, Home, Zap, Clock, Star, MessageCircle, Share2, Eye } from "lucide-react"
import DocumentsSection from "@/components/custom/DocumentsSection/DocumentsSection"
import { apiEndpoints, baseUrl } from "@/constants/constants"
import { ROUTES } from "@/constants/routeConfig"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [fileDescription, setFileDescription] = useState("")
  const [fileCategory, setFileCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [documentsRefetchTrigger, setDocumentsRefetchTrigger] = useState(0)
  const [documentTypes, setDocumentTypes] = useState([])

  useEffect(() => {
    fetchDocumentTypes()
  }, [])

  const fetchDocumentTypes = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}${apiEndpoints.getDocumentTypes}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      if (response.data.success && response.data.data) {
        setDocumentTypes(response.data.data)
        setFileCategory(response.data.data[0]?.id.toString() || "")
      }
    } catch (error) {
      console.error("Error fetching document types:", error)
    }
  }

  const handleFileInputChange = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name.replace(/\.[^/.]+$/, ""))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile || !fileName || !fileCategory) {
      toast.error("Please fill all required fields")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("documentName", fileName)
    formData.append("documentDescription", fileDescription || "")
    formData.append("documentTypeId", fileCategory)

    try {
      const response = await axios.post(
        `${baseUrl}${apiEndpoints.uploadDocument}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )

      if (response.data.success) {
        toast.success("Document uploaded successfully")
        setSelectedFile(null)
        setFileName("")
        setFileDescription("")
        setDocumentsRefetchTrigger((prev) => prev + 1)
      } else {
        toast.error(response.data.message || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Error uploading document")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-full mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              D
            </div>
            DocuVault
          </Link>
          <div className="flex items-center gap-6">
            <Link to={ROUTES.PROFILE} className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">
              {currentUser?.username}
            </Link>
            <button
              onClick={() => navigate(ROUTES.SETTINGS)}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex gap-4 px-4 py-6">
        {/* Sidebar Navigation */}
        <aside className="hidden sm:block w-72 flex-shrink-0">
          <div className="sticky top-20 space-y-0">
            <nav className="bg-card border border-border rounded overflow-hidden">
              <Link to={ROUTES.DASHBOARD}>
                <div className="flex items-center gap-4 px-4 py-3 border-b border-border hover:bg-secondary text-foreground cursor-pointer transition-colors">
                  <Home size={20} className="text-primary" />
                  <span className="font-medium">Home</span>
                </div>
              </Link>
              <Link to={ROUTES.FEED}>
                <div className="flex items-center gap-4 px-4 py-3 border-b border-border hover:bg-secondary text-foreground cursor-pointer transition-colors">
                  <Zap size={20} className="text-primary" />
                  <span className="font-medium">Feed</span>
                </div>
              </Link>
              <Link to={ROUTES.DOWNLOAD_HISTORY} className="block">
                <div className="flex items-center gap-4 px-4 py-3 border-b border-border hover:bg-secondary text-foreground cursor-pointer transition-colors">
                  <Clock size={20} className="text-primary" />
                  <span className="font-medium">Downloads</span>
                </div>
              </Link>
              <Link to={ROUTES.PRICING}>
                <div className="flex items-center gap-4 px-4 py-3 hover:bg-secondary text-foreground cursor-pointer transition-colors">
                  <Star size={20} className="text-primary" />
                  <span className="font-medium">Premium</span>
                </div>
              </Link>
            </nav>

            <div className="mt-4 bg-card border border-border rounded p-4 space-y-3">
              <h3 className="font-bold text-sm">About r/DocuVault</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Share and manage your documents securely with your community.
              </p>
              <div className="flex gap-4 pt-2 border-t border-border text-xs">
                <div>
                  <p className="text-muted-foreground">Members</p>
                  <p className="font-bold">2.8K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Online</p>
                  <p className="font-bold">347</p>
                </div>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold text-sm hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Create Post Card */}
          <div className="bg-card border border-border rounded mb-4 p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-sm font-bold text-primary">
                {currentUser?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <form onSubmit={handleSubmit} className="flex-1 space-y-3">
                <Input
                  placeholder="Give your document a name..."
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="bg-secondary border-0 text-foreground placeholder:text-muted-foreground rounded"
                />

                <Textarea
                  placeholder="Add a description (optional)"
                  value={fileDescription}
                  onChange={(e) => setFileDescription(e.target.value)}
                  className="min-h-20 bg-secondary border-0 text-foreground placeholder:text-muted-foreground resize-none rounded"
                />

                <div className="flex gap-2 flex-wrap">
                  <div
                    className="flex-1 min-w-40 border-2 border-dashed border-border rounded p-3 text-center cursor-pointer hover:border-primary/50 transition-colors bg-secondary/50"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <p className="text-xs text-muted-foreground font-medium">
                      {selectedFile ? selectedFile.name : "Upload file"}
                    </p>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept=".doc,.docx,.pdf,image/*"
                      onChange={handleFileInputChange}
                    />
                  </div>

                  <Select value={fileCategory} onValueChange={setFileCategory}>
                    <SelectTrigger className="w-40 bg-secondary border-0 rounded text-xs">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.id} value={String(type.id)}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFileName("")
                      setFileDescription("")
                      setSelectedFile(null)
                    }}
                    className="px-4 py-2 text-sm text-muted-foreground hover:bg-secondary rounded transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin mr-2" />
                        Uploading
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3 mr-2" />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Documents Feed */}
          <div className="space-y-4">
            <DocumentsSection
              userId={currentUser?.user_id}
              baseUrl={baseUrl}
              refetchTrigger={documentsRefetchTrigger}
            />
          </div>
        </main>

        {/* Right Sidebar - Trending (hidden on smaller screens) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-20 bg-card border border-border rounded overflow-hidden">
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <p className="font-bold text-sm">Trending Today</p>
            </div>
            <div className="divide-y divide-border">
              {["Documentation", "API Guides", "Security Tips", "Best Practices", "Community Highlights"].map((trend, i) => (
                <div key={i} className="px-4 py-3 hover:bg-secondary cursor-pointer transition-colors">
                  <p className="text-xs text-muted-foreground">r/DocuVault • Trending</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{trend}</p>
                  <p className="text-xs text-muted-foreground mt-1">847K upvotes</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
