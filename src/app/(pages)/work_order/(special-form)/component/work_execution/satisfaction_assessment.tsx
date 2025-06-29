import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import CardCollapse from '../CardCollapse';

interface SatisfactionData {
  rating: number;
  comment: string;
  signature: string;
}

interface SatisfactionAssessmentProps {
  onDataChange?: (data: SatisfactionData) => void;
}

const SatisfactionAssessment: React.FC<SatisfactionAssessmentProps> = ({ onDataChange }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [showSignature, setShowSignature] = useState<boolean>(false);
  const [signature, setSignature] = useState<string>('');

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    updateData(newRating, comment, signature);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    updateData(rating, newComment, signature);
  };

  const updateData = (newRating: number, newComment: string, newSignature: string) => {
    onDataChange?.({
      rating: newRating,
      comment: newComment,
      signature: newSignature
    });
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'ไม่พอใจมาก';
      case 2: return 'ไม่พอใจ';
      case 3: return 'ปานกลาง';
      case 4: return 'พอใจ';
      case 5: return 'พอใจมาก';
      default: return '';
    }
  };

  const handleSignatureClick = () => {
    setShowSignature(true);
  };

  const handleSignatureComplete = () => {
    // จำลองลายเซ็น
    const mockSignature = 'ลายเซ็นอิเล็กทรอนิกส์';
    setSignature(mockSignature);
    updateData(rating, comment, mockSignature);
    setShowSignature(false);
  };

  return (
    <CardCollapse title="ผลการประเมินความพึงพอใจของลูกค้าต่อการปฏิบัติงาน">
      <div className="p-4 space-y-6">
        
        {/* Rating Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            คะแนนประเมิน 5/5 :
          </Label>
          
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-2xl transition-colors ${
                  star <= rating 
                    ? 'text-yellow-400 hover:text-yellow-500' 
                    : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                <FontAwesomeIcon icon={faStar} />
              </button>
            ))}
            <span className="ml-3 text-sm font-medium text-gray-700">
              {rating}/5 {rating > 0 && `- ${getRatingText(rating)}`}
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <Label htmlFor="satisfaction-comment" className="text-sm font-medium text-gray-700 mb-2 block">
            ความคิดเห็น :
          </Label>
          
          <textarea
            id="satisfaction-comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="เช่น น้ำมันก็ดีกว่าระบบเดิม ติดตั้งรวดเร็ว บริการดี ถูกต้องตามต้องการ"
            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 border-[#D1D5DB] focus:border-[#671FAB] focus:ring-[#671FAB] md:text-sm"
          />
        </div>

        {/* Signature Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            ลายเซ็นลูกค้า
          </Label>
          
          <div className="flex items-center gap-4">
            {/* Signature Canvas/Display */}
            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center bg-gray-50">
              {signature ? (
                <div className="text-center">
                  <div className="text-2xl font-signature text-gray-700 mb-2">
                    {/* Mock signature display */}
                    <span style={{ fontFamily: 'cursive', fontSize: '24px' }}>
                      ลายเซ็นลูกค้า
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">ลายเซ็นอิเล็กทรอนิกส์</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <FontAwesomeIcon icon={faPen} className="text-2xl mb-2" />
                  <p className="text-sm">คลิกปุ่มด้านขวาเพื่อเซ็นชื่อ</p>
                </div>
              )}
            </div>
            
            {/* Signature Button */}
            <div className="flex-shrink-0">
              <Button
                type="button"
                onClick={handleSignatureClick}
                className="bg-[#671FAB] hover:bg-[#5A1A96] text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                ภาพลายเซ็นลูกค้า
              </Button>
            </div>
          </div>
        </div>

        {/* Summary */}
        {(rating > 0 || comment || signature) && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">สรุปการประเมิน</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {rating > 0 && (
                <p>คะแนน: {rating}/5 ({getRatingText(rating)})</p>
              )}
              {comment && (
                <p>ความคิดเห็น: {comment}</p>
              )}
              {signature && (
                <p>ลายเซ็น: ✓ เซ็นชื่อแล้ว</p>
              )}
            </div>
          </div>
        )}

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
    </CardCollapse>
  );
};

export default SatisfactionAssessment;