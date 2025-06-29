import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import CardCollapse from '../CardCollapse';

interface CommentProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const Comment: React.FC<CommentProps> = ({ 
  value = '', 
  onChange, 
  maxLength = 250 
}) => {
  const [comment, setComment] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Limit character count
    if (newValue.length <= maxLength) {
      setComment(newValue);
      onChange?.(newValue);
    }
  };

  const remainingChars = maxLength - comment.length;

  return (
    <CardCollapse title="หมายเหตุเพิ่มเติม">
      <div className="p-4">
        <div className="space-y-2">
          <Label htmlFor="comment" className="text-sm font-medium text-gray-700">
            กรอกหมายเหตุเพิ่มเติม
          </Label>
          
          <textarea
            id="comment"
            value={comment}
            onChange={handleChange}
            placeholder="กรอกหมายเหตุเพิ่มเติม..."
            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none border-[#D1D5DB] focus:border-[#671FAB] focus:ring-[#671FAB] md:text-sm"
            maxLength={maxLength}
          />
          
          <div className="flex justify-end">
            <span className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars}/{maxLength}
            </span>
          </div>
        </div>
        
        {comment.trim() && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-1">ตัวอย่างหมายเหตุ:</p>
            <p className="text-sm text-gray-800 italic">"{comment}"</p>
            <p className="text-xs text-gray-500 mt-1">
              จำนวนตัวอักษร: {comment.length} ตัวอักษร
            </p>
          </div>
        )}
      </div>
    </CardCollapse>
  );
};

export default Comment;