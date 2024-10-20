import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  Download,
  Trash2,
  FileText,
  FileImage,
  FileCode2,
} from "lucide-react";
import DeleteModal from "@/components/custom/Modals/DeleteModal";
import DownloadModal from "@/components/custom/Modals/DownloadModal";

const documents = [
  {
    id: 1,
    name: "Project Proposal",
    category: "Business",
    format: "pdf",
    dateUploaded: "2023-05-15",
  },
  {
    id: 2,
    name: "Meeting Minutes",
    category: "Notes",
    format: "docx",
    dateUploaded: "2023-05-20",
  },
  {
    id: 3,
    name: "Product Mockup",
    category: "Design",
    format: "png",
    dateUploaded: "2023-05-22",
  },
  {
    id: 4,
    name: "Financial Report",
    category: "Finance",
    format: "xlsx",
    dateUploaded: "2023-05-25",
  },
  {
    id: 5,
    name: "User Manual",
    category: "Documentation",
    format: "pdf",
    dateUploaded: "2023-05-28",
  },
];

const getFileIcon = (format) => {
  switch (format) {
    case "pdf":
      return <FileCode2 className="h-6 w-6 text-red-500" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage className="h-6 w-6 text-blue-500" />;
    default:
      return <FileText className="h-6 w-6 text-gray-500" />;
  }
};

const DocumentsSection = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDelete = (id) => {
    setSelectedDocument(documents.find((doc) => doc.id === id));
    setIsDeleteModalOpen(true);
  };

  const handleDownload = (document) => {
    setSelectedDocument(document);
    setIsDownloadModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Delete document with id: ${selectedDocument.id}`);
    setIsDeleteModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Manage your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Format</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{getFileIcon(doc.format)}</TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.dateUploaded}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload(doc)}>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        documentName={selectedDocument ? selectedDocument.name : ""}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onDownload={(downloadOptions) => {
          console.log(
            `Download options for ${selectedDocument.name}:`,
            downloadOptions
          );
          setIsDownloadModalOpen(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument}
      />
    </>
  );
};

export default DocumentsSection;
