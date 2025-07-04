import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faFilePdf, faTrash } from "@fortawesome/pro-light-svg-icons";
import CardCollapse from '../CardCollapse';
import { useAppSelector } from "@/app/redux/hook";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  file: File;
}

interface AddFileProps {
  onFilesChange?: (files: UploadedFile[]) => void;
}

const AddFile: React.FC<AddFileProps> = ({ onFilesChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const screenSize = useAppSelector(state => state.screen_size);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`ไฟล์ ${file.name} ไม่ใช่ไฟล์ PDF`);
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert(`ไฟล์ ${file.name} มีขนาดเกิน 10MB`);
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        size: file.size,
        file: file
      };
      newFiles.push(newFile);
    });

    setUploadedFiles(prev => {
      const updated = [...prev, ...newFiles];
      onFilesChange?.(updated);
      return updated;
    });
    setUploading(false);

    // Reset input
    event.target.value = '';
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(file => file.id !== id);
      onFilesChange?.(updated);
      return updated;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Desktop Layout
  if (screenSize === 'desktop') {
    return (
      <CardCollapse title="ไฟล์แนบเพิ่มเติม">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Uploaded Files List */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">
                ไฟล์แนบเพิ่มเติม ({uploadedFiles.length})
              </h4>
              
              {uploadedFiles.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faFilePdf} className="text-red-500 text-lg" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)} • PDF</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className="bg-purple-600 h-1 rounded-full w-full"></div>
                        </div>
                      </div>

                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1"
                        >
                          <FontAwesomeIcon icon={faFilePdf} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FontAwesomeIcon icon={faFilePdf} className="text-4xl text-gray-300 mb-2" />
                  <p>ไม่มีไฟล์แนบเพิ่มเติม</p>
                </div>
              )}
            </div>

            {/* Right Column - Upload Area */}
            <div className="flex flex-col justify-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faFilePdf} className="text-red-500 text-2xl" />
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-2">รองรับไฟล์นามสกุล .pdf</p>
                    <p className="text-sm text-gray-500">ขนาดสูงสุด 10 MB</p>
                  </div>

                  <div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={uploading}
                    />
                    <label htmlFor="file-upload">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="pea-button-outline my-2 w-[50%]"
                        disabled={uploading}
                      >
                        <FontAwesomeIcon icon={faCloudUpload} className="mr-2" />
                        {uploading ? 'กำลังอัพโหลด...' : 'อัปโหลดไฟล์'}
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardCollapse>
    );
  }

  // Mobile/Tablet Layout (Original)
  return (
    <CardCollapse title="ไฟล์แนบเพิ่มเติม">
      <div className="p-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-red-500 text-xl" />
            </div>
            
            <div>
              <p className="text-gray-600 mb-2">รองรับไฟล์นามสกุล .pdf</p>
              <p className="text-sm text-gray-500">ขนาดสูงสุด 10 MB</p>
            </div>

            <div>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-mobile"
                disabled={uploading}
              />
              <label htmlFor="file-upload-mobile">
                <Button 
                  type="button" 
                  variant="outline"
                  className="pea-button-outline my-2 w-full"
                  disabled={uploading}
                >
                  <FontAwesomeIcon icon={faCloudUpload} className="mr-2" />
                  {uploading ? 'กำลังอัพโหลด...' : 'อัพโหลดไฟล์'}
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="font-medium text-gray-700">ไฟล์ที่อัพโหลด ({uploadedFiles.length})</h4>
            
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faFilePdf} className="text-red-500 text-lg" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)} • PDF</p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </CardCollapse>
  );
};

export default AddFile;