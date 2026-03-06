import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { Upload, Loader2, FileText, Plus, ArrowRight } from "lucide-react"
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
  const [showUploadForm, setShowUploadForm] = useState(false)

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
        setShowUploadForm(false)
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
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
              D
            </div>
            DocuVault
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <Link to={ROUTES.FEED} className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">
                Community
              </Link>
              <Link to={ROUTES.PRICING} className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Link to={ROUTES.DOWNLOAD_HISTORY} className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">
                Downloads
              </Link>
              <button
                onClick={() => navigate(ROUTES.SETTINGS)}
                className="text-foreground/70 hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-lg"
              >
                ⚙️
              </button>
              <Link to={ROUTES.PROFILE} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {currentUser?.username?.charAt(0).toUpperCase() || "U"}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Welcome back, {currentUser?.username}
          </h1>
          <p className="text-lg text-foreground/60">
            Manage and organize your documents in one secure place
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          {!showUploadForm ? (
            <button
              onClick={() => setShowUploadForm(true)}
              className="w-full p-8 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Plus size={24} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Upload a new document</p>
                  <p className="text-sm text-foreground/60">Click or drag and drop files here</p>
                </div>
              </div>
            </button>
          ) : (
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Upload Document</h2>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="text-foreground/60 hover:text-foreground text-xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="file" className="text-foreground font-semibold mb-2 block">
                    Select File
                  </Label>
                  <div
                    className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <FileText size={32} className="text-primary/50 mx-auto mb-2" />
                    <p className="text-sm text-foreground/70">{selectedFile?.name || "Choose file"}</p>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept=".doc,.docx,.pdf,image/*"
                      onChange={handleFileInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-semibold mb-2 block">
                      Document Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Project Proposal"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-foreground font-semibold mb-2 block">
                      Category
                    </Label>
                    <Select value={fileCategory} onValueChange={(value) => setFileCategory(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground font-semibold mb-2 block">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add details about this document..."
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Document
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUploadForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Documents</h2>
          <DocumentsSection
            userId={currentUser?.user_id}
            baseUrl={baseUrl}
            refetchTrigger={documentsRefetchTrigger}
          />
        </div>
      </main>
    </div>
  )
}
