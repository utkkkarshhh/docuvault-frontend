import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, FileText } from "lucide-react";
import DocumentsSection from "@/components/custom/DocumentsSection/DocumentsSection";

export default function ResponsiveHomepage() {
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileCategory, setFileCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentsRefetchTrigger, setDocumentsRefetchTrigger] = useState(0);

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const { currentUser } = useSelector((state) => state.user);

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
    formData.append("user_id", currentUser.user_id);

    try {
      setIsLoading(true);

      if (!baseUrl) {
        throw new Error("Base URL is not defined");
      }

      const response = await axios.post(
        `${baseUrl}/api/doc/uploadDocument`,
        formData,
        {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left text-gray-800">
            Welcome back, {currentUser?.username}!
          </h1>
          <p className="text-gray-600 text-center md:text-left">
            Manage your documents and upload new files with ease.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="w-full bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">
                Upload Document
              </CardTitle>
              <CardDescription>
                Drag and drop your file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <Upload className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                  Upload your file or drag and drop it here
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Supported formats: .doc, .docx, .pdf, .png, .jpg, .jpeg
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
                <div className="mt-4 p-3 bg-green-100 rounded-md flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm text-green-700">
                    File selected: {selectedFile.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="w-full bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">
                File Information
              </CardTitle>
              <CardDescription>
                Provide details about your document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Document Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter file name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter file description"
                    className="min-h-[100px] border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700">
                    File Category *
                  </Label>
                  <Select
                    value={fileCategory}
                    onValueChange={(value) => setFileCategory(value)}
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public_id">Public ID</SelectItem>
                      <SelectItem value="document">Legal Document</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Document"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <DocumentsSection
          userId={currentUser?.user_id}
          baseUrl={baseUrl}
          refetchTrigger={documentsRefetchTrigger}
        />
      </div>
    </div>
  );
}
