import React from "react";
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
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import "./HomepageInput.scss";

const HomepageInput = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Document uploaded");
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
            <Input
              id="name"
              placeholder="Enter file name"
            />
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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Public ID</SelectItem>
                <SelectItem value="light">Document</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">Other</SelectItem>
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
