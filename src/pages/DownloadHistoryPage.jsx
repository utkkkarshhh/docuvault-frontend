"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routeConfig"
import { MOCK_DOWNLOAD_HISTORY, formatDownloadDate } from "@/utils/mockData"
import { Download, Calendar, HardDrive, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

export default function DownloadHistoryPage() {
  const navigate = useNavigate()
  const [downloads, setDownloads] = useState([])
  const [filteredDownloads, setFilteredDownloads] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading downloads
    setTimeout(() => {
      setDownloads(MOCK_DOWNLOAD_HISTORY)
      setFilteredDownloads(MOCK_DOWNLOAD_HISTORY)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDownloads(downloads)
    } else {
      const filtered = downloads.filter(
        (download) =>
          download.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          download.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredDownloads(filtered)
    }
  }, [searchQuery, downloads])

  const handleDeleteDownload = (id) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id))
    toast.success("Item removed from history")
  }

  const formatFileSize = (sizeStr) => {
    return sizeStr
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            DocuVault
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate(ROUTES.SETTINGS)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Download History</h1>
            <p className="text-muted-foreground">View your recent document downloads</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2.5"
            />
          </div>
        </div>

        {/* Table/List View */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <p className="text-muted-foreground">Loading download history...</p>
              </div>
            </div>
          ) : filteredDownloads.length === 0 ? (
            <div className="p-12 text-center">
              <Download className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">
                {searchQuery ? "No downloads match your search" : "No download history yet"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/30 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">File Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Size</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Downloaded</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredDownloads.map((download) => (
                      <tr key={download.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-primary uppercase">
                                {download.format}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {download.fileName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="badge badge-secondary text-xs">
                            {download.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HardDrive className="w-4 h-4" />
                            {formatFileSize(download.fileSize)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDownloadDate(download.downloadedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteDownload(download.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-2"
                            title="Remove from history"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-border">
                {filteredDownloads.map((download) => (
                  <div key={download.id} className="p-4 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-semibold text-primary uppercase">
                            {download.format}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {download.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatFileSize(download.fileSize)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteDownload(download.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="badge badge-secondary">{download.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDownloadDate(download.downloadedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        {!loading && filteredDownloads.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <p className="text-2xl font-bold text-primary mb-1">{downloads.length}</p>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-primary mb-1">
                {new Set(downloads.map((d) => d.category)).size}
              </p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-primary mb-1">
                {downloads.length > 0 ? downloads[0].downloadedAt.toLocaleDateString() : "-"}
              </p>
              <p className="text-sm text-muted-foreground">Latest Download</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-primary mb-1">
                {downloads
                  .reduce((sum, d) => sum + parseFloat(d.fileSize), 0)
                  .toFixed(1)}{" "}
                MB
              </p>
              <p className="text-sm text-muted-foreground">Total Size</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
