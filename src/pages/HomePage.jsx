import React, { useState } from "react";
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
import { Upload } from "lucide-react";

export default function ResponsiveHomepage() {
  const [userName, setUserName] = useState("Utkarsh");
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileCategory, setFileCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Document uploaded", {
      fileName,
      fileDescription,
      fileCategory,
      selectedFile,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center md:text-left">
          Hi {userName}, Welcome back!
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Drag and drop your file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Upload your file or drag and drop it here
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Only .doc, .docx, .pdf, .png, .jpg, .jpeg
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
                <p className="mt-2 text-sm text-green-600">
                  File selected: {selectedFile.name}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Add file information</CardTitle>
              <CardDescription>
                Please tell us something about this file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    What would you like to call it? *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter file name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Add a description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter file description"
                    className="min-h-[100px]"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">File Category *</Label>
                  <Select onValueChange={(value) => setFileCategory(value)}>
                    <SelectTrigger className="w-full">
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
                <Button type="submit" className="w-full">
                  Upload Document
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
