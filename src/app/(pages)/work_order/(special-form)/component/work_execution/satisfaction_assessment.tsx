import React, { useState } from "react";
import CardCollapse from "../CardCollapse";


import SignatureSection from "./signature_section";
import RatingAndComment from "./RatingAndComment ";

interface SatisfactionData {
  rating: number;
  comment: string;
  signature: string;
}

interface SatisfactionAssessmentProps {
  onDataChange?: (data: SatisfactionData) => void;
}

const SatisfactionAssessment: React.FC<SatisfactionAssessmentProps> = ({
  onDataChange,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    updateData(newRating, comment, signature);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    updateData(rating, newComment, signature);
  };

  const handleSignatureChange = (newSignature: string) => {
    setSignature(newSignature);
    updateData(rating, comment, newSignature);
  };

  const updateData = (
    newRating: number,
    newComment: string,
    newSignature: string
  ) => {
    onDataChange?.({
      rating: newRating,
      comment: newComment,
      signature: newSignature,
    });
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "ไม่พอใจมาก";
      case 2:
        return "ไม่พอใจ";
      case 3:
        return "ปานกลาง";
      case 4:
        return "พอใจ";
      case 5:
        return "พอใจมาก";
      default:
        return "";
    }
  };

  return (
    <CardCollapse title="ผลการประเมินความพึงพอใจของลูกค้าต่อการปฏิบัติงาน">
      <div className="p-4 space-y-6">
        {/* Main Layout with flex-row */}
        <div className="flex flex-row gap-4">
          {/* Left side - Rating and Comment */}
          <RatingAndComment
            rating={rating}
            comment={comment}
            onRatingChange={handleRatingChange}
            onCommentChange={handleCommentChange}
          />

          {/* Right side - Signature Section */}
          <SignatureSection
            title="ภาพลายเซ็นลูกค้า"
            signature={signature}
            onSignatureChange={handleSignatureChange}
          />
        </div>

        {/* Summary */}
        {(rating > 0 || comment || signature) && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">สรุปการประเมิน</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {rating > 0 && (
                <p>
                  คะแนน: {rating}/5 ({getRatingText(rating)})
                </p>
              )}
              {comment && <p>ความคิดเห็น: {comment}</p>}
              {signature && <p>ลายเซ็น: ✓ เซ็นชื่อแล้ว</p>}
            </div>
          </div>
        )}
      </div>
    </CardCollapse>
  );
};

export default SatisfactionAssessment;