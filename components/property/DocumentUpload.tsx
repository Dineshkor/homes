'use client'
import { useState } from 'react'
import { FaFile, FaUpload, FaTrash } from 'react-icons/fa'

interface Document {
  id: string
  name: string
  type: 'floor_plan' | 'property_papers' | 'noc' | 'other'
  url: string
  uploadedAt: string
}

interface DocumentUploadProps {
  documents: Document[]
  onUpload: (file: File, type: Document['type']) => Promise<void>
  onDelete: (documentId: string) => Promise<void>
}

export default function DocumentUpload({ documents, onUpload, onDelete }: DocumentUploadProps) {
  const [selectedType, setSelectedType] = useState<Document['type']>('floor_plan')
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      await onUpload(file, selectedType)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as Document['type'])}
          className="flex-1 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
        >
          <option value="floor_plan">Floor Plan</option>
          <option value="property_papers">Property Papers</option>
          <option value="noc">NOC</option>
          <option value="other">Other</option>
        </select>
        
        <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark cursor-pointer">
          <FaUpload className="mr-2" />
          Upload
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-primary transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FaFile className="text-primary" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark"
              >
                View
              </a>
              <button
                onClick={() => onDelete(doc.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}