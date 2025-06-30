import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";

interface SignatureSectionProps {
  title: string;
  signature: string;
  onSignatureChange: (signature: string) => void;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  title,
  signature,
  onSignatureChange
}) => {
  const [showSignature, setShowSignature] = useState<boolean>(false);

  const handleSignatureClick = () => {
    setShowSignature(true);
  };

  const handleSignatureComplete = () => {
    // จำลองลายเซ็น
    const mockSignature = 'ลายเซ็นอิเล็กทรอนิกส์';
    onSignatureChange(mockSignature);
    setShowSignature(false);
  };

  return (
    <div className="flex flex-col items-center space-y-3 border-2 p-8 rounded-lg w-[45%]">
      <div className="flex items-center justify-between mb-3 w-full">
        <Label className="w-full bg-[#671FAB] text-white px-4 py-2 rounded-md text-sm text-center justify-center">
          {title}
        </Label>
      </div>
      
      {/* Signature Canvas/Display */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 w-full flex items-center justify-center bg-gray-50">
        {signature ? (
          <div className="text-center">
            <div className="text-2xl font-signature text-gray-700 mb-2"></div>
            <p className="text-xs text-gray-500">ลายเซ็นอิเล็กทรอนิกส์</p>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <FontAwesomeIcon icon={faPen} className="text-2xl mb-2" />
            <p className="text-sm">คลิกเพื่อเซ็นชื่อ</p>
          </div>
        )}
      </div>

      {/* Mock Signature Modal */}
      {showSignature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">ลายเซ็นอิเล็กทรอนิกส์</h3>
            <div className="border rounded-lg h-40 mb-4 bg-gray-50 flex items-center justify-center">
              <p className="text-gray-500">พื้นที่สำหรับเซ็นชื่อ</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSignature(false)}
              >
                ยกเลิก
              </Button>
              <Button
                onClick={handleSignatureComplete}
                className="bg-[#671FAB] hover:bg-[#5A1A96]"
              >
                ยืนยันลายเซ็น
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignatureSection;