import React from 'react';
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";

interface RatingAndCommentProps {
  rating: number;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RatingAndComment: React.FC<RatingAndCommentProps> = ({
  rating,
  comment,
  onRatingChange,
  onCommentChange
}) => {
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
    <div className="flex flex-col flex-1 space-y-6">
      {/* Rating Section */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          คะแนนประเมิน 5/5 :
        </Label>

        <div className="flex items-center space-x-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className={`text-2xl transition-colors ${
                star <= rating
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-300 hover:text-gray-400"
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
        <Label
          htmlFor="satisfaction-comment"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          ความคิดเห็น :
        </Label>

        <textarea
          id="satisfaction-comment"
          value={comment}
          onChange={onCommentChange}
          placeholder=""
          className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 border-[#D1D5DB] focus:border-[#671FAB] focus:ring-[#671FAB] md:text-sm"
        />
      </div>
    </div>
  );
};

export default RatingAndComment;