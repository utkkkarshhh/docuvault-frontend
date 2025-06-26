import React, { useEffect, useState } from "react";
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
import axios from "axios";
import "./HomepageInput.scss";
import { apiEndpoints, baseUrl, registerToken } from "../../../constants/constants";

const HomepageInput = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get(apiEndpoints.categoryMaster);
        setDocumentTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch document types:", error);
      }
    };

    fetchDocumentTypes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Document uploaded");
    console.log("Selected Type:", selectedType);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add file information</CardTitle>
        <CardDescription>
          Please tell us something about this file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">What would you like to call it? *</Label>
            <Input id="name" placeholder="Enter file name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Add a description (OPTIONAL)</Label>
            <Textarea
              id="description"
              placeholder="Enter file description"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">File Category</Label>
            <Select onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Upload Document
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HomepageInput;
