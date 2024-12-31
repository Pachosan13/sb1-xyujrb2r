import { useState } from 'react';
import { PaperClipIcon, CameraIcon } from '@heroicons/react/24/outline';

export default function ChatAttachments() {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      // TODO: Implement file upload logic
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 py-2 border-b border-gray-200 flex space-x-2">
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          disabled={uploading}
        />
        <PaperClipIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
      </label>
      
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          disabled={uploading}
        />
        <CameraIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
      </label>
    </div>
  );
}