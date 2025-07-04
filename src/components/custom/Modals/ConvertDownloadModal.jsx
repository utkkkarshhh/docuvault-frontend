import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {supportedTypeMapping, supportedFormatMapping} from "@/constants/constants"

const ConvertDownloadModal = ({ isOpen, onClose, onDownload, document }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [newFormat, setNewFormat] = useState("");

  useEffect(() => {
    if (document) {
      setNewFormat("");
    }
  }, [document]);

  const isImage = document && supportedTypeMapping.image.includes(document.format);
  const supportedFormats = document ? supportedFormatMapping[document.format] || [] : [];

  const handleDownload = () => {
    onDownload({
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      fileSize: fileSize ? Number(fileSize) : undefined,
      newFormat,
    });
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download {document.name}</DialogTitle>
          <DialogDescription>
            Current file format: {document.format.toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {isImage && (
            <>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="fileSize">File Size (KB)</Label>
                <Input
                  id="fileSize"
                  type="number"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="newFormat">New Format</Label>
            <Select value={newFormat} onValueChange={setNewFormat}>
              <SelectTrigger id="newFormat">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {supportedFormats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDownload} disabled={!newFormat}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConvertDownloadModal;
