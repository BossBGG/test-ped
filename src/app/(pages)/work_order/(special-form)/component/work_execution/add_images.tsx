import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faImage, faTrash } from "@fortawesome/pro-light-svg-icons";
import CardCollapse from '../CardCollapse';
import { useAppSelector } from "@/app/redux/hook";

interface UploadedImage {
  id: string;
  name: string;
  size: number;
  url: string;
  file: File;
}

interface AddImagesProps {
  onImagesChange?: (images: UploadedImage[]) => void;
}

const AddImages: React.FC<AddImagesProps> = ({ onImagesChange }) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const screenSize = useAppSelector(state => state.screen_size);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    const newImages: UploadedImage[] = [];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`ไฟล์ ${file.name} ไม่ใช่รูปภาพที่รองรับ (PNG, JPG)`);
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert(`ไฟล์ ${file.name} มีขนาดเกิน 10MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: UploadedImage = {
          id: Date.now() + Math.random().toString(),
          name: file.name,
          size: file.size,
          url: e.target?.result as string,
          file: file
        };
        newImages.push(newImage);

        // Update state when all files are processed
        if (newImages.length === Array.from(files).filter(f => 
          ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE
        ).length) {
          setUploadedImages(prev => {
            const updated = [...prev, ...newImages];
            onImagesChange?.(updated);
            return updated;
          });
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = '';
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      onImagesChange?.(updated);
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
      <CardCollapse title="รูปแนบเพิ่มเติม">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Uploaded Images List */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">
                รูปแนบเพิ่มเติม ({uploadedImages.length})
              </h4>
              
              {uploadedImages.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
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
                          <FontAwesomeIcon icon={faImage} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(image.id)}
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
                  <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-300 mb-2" />
                  <p>ไม่มีรูปแนบเพิ่มเติม</p>
                </div>
              )}
            </div>

            {/* Right Column - Upload Area */}
            <div className="flex flex-col justify-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faImage} className="text-gray-400 text-2xl" />
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-2">รองรับไฟล์นามสกุล .png หรือ .jpg</p>
                    <p className="text-sm text-gray-500">ขนาดสูงสุด 10 MB</p>
                  </div>

                  <div>
                    <input
                      type="file"
                      multiple
                      accept=".png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploading}
                    />
                    <label htmlFor="image-upload">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="pea-button-outline my-2 w-[50%]"
                        disabled={uploading}
                      >
                        <FontAwesomeIcon icon={faCloudUpload} className="mr-2" />
                        {uploading ? 'กำลังอัพโหลด...' : 'อัพโหลดรูปภาพ'}
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
    <CardCollapse title="รูปแนบเพิ่มเติม">
      <div className="p-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faImage} className="text-gray-400 text-xl" />
            </div>
            
            <div>
              <p className="text-gray-600 mb-2">รองรับไฟล์นามสกุล .png หรือ .jpg</p>
              <p className="text-sm text-gray-500">ขนาดสูงสุด 10 MB</p>
            </div>

            <div>
              <input
                type="file"
                multiple
                accept=".png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload-mobile"
                disabled={uploading}
              />
              <label htmlFor="image-upload-mobile">
                <Button 
                  type="button" 
                  variant="outline"
                  className="pea-button-outline my-2 w-full"
                  disabled={uploading}
                >
                  <FontAwesomeIcon icon={faCloudUpload} className="mr-2" />
                  {uploading ? 'กำลังอัพโหลด...' : 'อัพโหลดรูปภาพ'}
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Uploaded Images List */}
        {uploadedImages.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="font-medium text-gray-700">รูปภาพที่อัพโหลด ({uploadedImages.length})</h4>
            
            {uploadedImages.map((image) => (
              <div key={image.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(image.id)}
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

export default AddImages;