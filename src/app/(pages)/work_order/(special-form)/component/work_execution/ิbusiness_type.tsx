import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CardCollapse from '../CardCollapse';

interface BusinessTypeProps {
  value?: string;
  onChange?: (value: string) => void;
}

const BusinessType: React.FC<BusinessTypeProps> = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const businessOptions = [
    { value: 'manufacturing', label: 'ธุรกิจการผลิต' },
    { value: 'trading', label: 'ธุรกิจการค้า' },
    { value: 'service', label: 'ธุรกิจบริการ' },
    { value: 'agriculture', label: 'ธุรกิจการเกษตร' },
    { value: 'technology', label: 'ธุรกิจเทคโนโลยี' },
    { value: 'finance', label: 'ธุรกิจการเงิน' },
    { value: 'education', label: 'ธุรกิจการศึกษา' },
    { value: 'healthcare', label: 'ธุรกิจสุขภาพ' },
    { value: 'construction', label: 'ธุรกิจก่อสร้าง' },
    { value: 'other', label: 'อื่นๆ' }
  ];

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <CardCollapse title="ประเภทธุรกิจ">
      <div className="p-4">
        <div className="space-y-2">
          <Label htmlFor="business-type" className="text-sm font-medium text-gray-700">
            ประเภทธุรกิจ
          </Label>
          <Select value={selectedValue} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full h-[44px] border-[#D1D5DB]">
              <SelectValue placeholder="เลือกประเภทธุรกิจ" />
            </SelectTrigger>
            <SelectContent>
              {businessOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedValue && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              ประเภทธุรกิจที่เลือก: <span className="font-medium">
                {businessOptions.find(option => option.value === selectedValue)?.label}
              </span>
            </p>
          </div>
        )}
      </div>
    </CardCollapse>
  );
};

export default BusinessType;