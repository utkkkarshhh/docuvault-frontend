import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, Loader2, FileText, Zap, Clock, Lock } from "lucide-react"
import DocumentsSection from "@/components/custom/DocumentsSection/DocumentsSection"
import { apiEndpoints, baseUrl } from "@/constants/constants"
import { ROUTES } from "@/constants/routeConfig"

export default function ResponsiveHomepage() {
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileCategory, setFileCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentsRefetchTrigger, setDocumentsRefetchTrigger] = useState(0);
  const [documentTypes, setDocumentTypes] = useState([]);
  
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get(apiEndpoints.categoryMaster);
        if (Array.isArray(response.data.data)) {
          setDocumentTypes(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching document types:", error);
        toast.error("Failed to load file categories");
      }
    };

    if (baseUrl) {
      fetchDocumentTypes();
    }
  }, [baseUrl]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const resetForm = () => {
    setFileName("");
    setFileDescription("");
    setFileCategory("");
    setSelectedFile(null);
    document.getElementById("fileInput").value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    if (!fileCategory) {
      toast.error("Please select a file category.");
      return;
    }

    if (!fileName.trim()) {
      toast.error("Please enter a file name.");
      return;
    }

    const formData = new FormData();
    formData.append("name", fileName);
    formData.append("description", fileDescription);
    formData.append("type", fileCategory);
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);

      if (!baseUrl) {
        throw new Error("Base URL is not defined");
      }

      const response = await axios.post(apiEndpoints.uploadDocument, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        resetForm();
        toast.success(
          response.data.message || "Document uploaded successfully!"
        );
        setDocumentsRefetchTrigger((prev) => prev + 1);
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (error) {
      let errorMessage = "An error occurred during upload.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      toast.error(errorMessage);
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Welcome back, <span className="text-primary font-semibold">{currentUser?.username}</span>. Manage your documents and upload new files with ease.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground/70 text-sm">Recent Uploads</p>
                  <p className="text-2xl font-bold">5 files</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Lock size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-foreground/70 text-sm">Storage Used</p>
                  <p className="text-2xl font-bold">2.4 GB</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground/70 text-sm">Total Files</p>
                  <p className="text-2xl font-bold">24 files</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="grid gap-8 lg:grid-cols-5 mb-12">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-xl border border-border/50 bg-card/30 backdrop-blur hover:border-primary/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-2">Upload Document</h2>
              <p className="text-foreground/70 mb-6">Drag and drop your file or click to browse</p>
              
              <div
                className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Upload size={32} className="text-primary" />
                  </div>
                </div>
                <p className="text-foreground font-medium mb-2">
                  Drag files here or click to browse
                </p>
                <p className="text-foreground/60 text-sm">
                  Supports: .doc, .docx, .pdf, .png, .jpg, .jpeg
                </p>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".doc,.docx,.pdf,image/*"
                  onChange={handleFileInputChange}
                  required
                />
              </div>

              {selectedFile && (
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      File selected
                    </p>
                    <p className="text-xs text-foreground/70 truncate">
                      {selectedFile.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File Information Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-xl border border-border/50 bg-card/30 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">File Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Document Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter a meaningful name for your document"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                    className="bg-input border-border/50 text-foreground placeholder:text-foreground/50 focus:border-primary/50 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add details about your document (optional)"
                    className="min-h-[100px] bg-input border-border/50 text-foreground placeholder:text-foreground/50 focus:border-primary/50 focus:ring-primary/30 resize-none"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground font-medium">
                    File Category <span className="text-primary">*</span>
                  </Label>
                  <Select
                    value={fileCategory}
                    onValueChange={(value) => setFileCategory(value)}
                  >
                    <SelectTrigger className="bg-input border-border/50 text-foreground focus:border-primary/50 focus:ring-primary/30">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      {documentTypes.map((type) => (
                        <SelectItem key={type.id} value={String(type.id)} className="text-foreground">
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold text-base transition-all mt-2"
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
              </form>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-8">Your Documents</h2>
          <DocumentsSection
            userId={currentUser?.user_id}
            baseUrl={baseUrl}
            refetchTrigger={documentsRefetchTrigger}
          />
        </div>
      </div>
    </div>
  );
}
