import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
  Loader2,
  CloudDownload,
} from "lucide-react";
import DeleteModal from "@/components/custom/Modals/DeleteModal";
import ConvertDownloadModal from "@/components/custom/Modals/ConvertDownloadModal";
import { useSelector } from "react-redux";
import { apiEndpoints, baseUrl, registerToken } from "../../../constants/constants";

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

const DocumentsSection = ({ userId, baseUrl, refetchTrigger = 0 }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const fetchDocuments = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(apiEndpoints.getAllUserDocuments, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setDocuments(response.data.data || []);
        toast.success(response.data.message || "Documents loaded successfully");
      } else {
        const errorMsg =
          Array.isArray(response.data.errors) && response.data.errors.length > 0
            ? response.data.errors[0]
            : response.data.message || "Failed to fetch documents";

        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);

      const errorMsg =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        "Error loading documents";

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [userId, currentUser.token, refetchTrigger]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDelete = async (id) => {
    const requestPayload = {
      document_id: id,
    };

    try {
      const response = await axios.post(
        apiEndpoints.deleteDocument,
        requestPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedDocuments = documents.filter((doc) => doc.id !== id);
        setDocuments(updatedDocuments);
        toast.success("Document deleted successfully");
        setIsDeleteModalOpen(false);
      } else {
        // Handle structured error messages
        const errorMsg =
          Array.isArray(response.data.errors) && response.data.errors.length > 0
            ? response.data.errors[0]
            : response.data.message || "Failed to delete document";

        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Delete error:", err);

      const errorMsg =
        err.response?.data?.errors?.[0] ||
        err.response?.data?.message ||
        "Error deleting document";

      toast.error(errorMsg);
    }
  };

  const handleDownload = (document) => {
    window.open(document.link, "_blank");
  };

  const handleConversion = (document) => {
    setSelectedDocument(document);
    setIsConvertModalOpen(true);
  };

  const handleConvertAndDownload = async (conversionOptions) => {
    try {
      // Here you would typically call your API to convert the document
      // For now, we'll just show a success message
      toast.success(
        `Converting ${selectedDocument.upload_name} to ${conversionOptions.newFormat}`
      );

      // Example API call for document conversion
      // const response = await axios.post(
      //   `${baseUrl}/api/doc/convertDocument`,
      //   {
      //     documentId: selectedDocument.id,
      //     ...conversionOptions
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${currentUser.token}`,
      //     },
      //   }
      // );

      // Close the modal after conversion is initiated
      setIsConvertModalOpen(false);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Error converting document");
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center">
            <Loader2 className="mr-2 animate-spin" /> Loading Documents
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800">Your Documents</CardTitle>
        <CardDescription>Manage your uploaded files</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {Array.isArray(documents) && documents.length === 0 ? (
            <p className="text-center text-gray-500">
              No documents uploaded yet
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Format</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell>{getFileIcon(doc.format)}</TableCell>
                    <TableCell className="font-medium">
                      {doc.upload_name}
                    </TableCell>
                    <TableCell>{doc.description}</TableCell>
                    <TableCell>{doc.type?.name || "—"}</TableCell>
                    <TableCell>
                      {new Date(doc.created_at).toLocaleDateString()}
                    </TableCell>
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
                            <CloudDownload className="mr-2 h-4 w-4" />
                            <span>Download Original </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleConversion(doc)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            <span>Convert Document</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedDocument(doc);
                              setIsDeleteModalOpen(true);
                            }}
                          >
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
          )}
        </div>
      </CardContent>

      {selectedDocument && (
        <>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => handleDelete(selectedDocument.id)}
            documentName={selectedDocument.upload_name}
          />

          <ConvertDownloadModal
            isOpen={isConvertModalOpen}
            onClose={() => setIsConvertModalOpen(false)}
            onDownload={handleConvertAndDownload}
            document={selectedDocument}
          />
        </>
      )}
    </Card>
  );
};

export default DocumentsSection;
