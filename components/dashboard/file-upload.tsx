"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

interface UploadedFile {
  id: number
  name: string
  size: string
  type: string
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile: UploadedFile = {
      id: files.length + 1,
      name: `document-${files.length + 1}.pdf`,
      size: "2.4 MB",
      type: "PDF",
    }
    setFiles((prev) => [...prev, newFile])
  }

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">Drag and drop files here, or click to select</p>
            <Button onClick={handleFileUpload} className="mt-4">
              Select Files
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Files</h4>
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.size} • {file.type}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
