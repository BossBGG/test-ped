import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUser } from "@fortawesome/pro-light-svg-icons";
import CardCollapse from '../CardCollapse';

interface RecordKeeperData {
  employeeId: string;
  name: string;
  phoneNumber: string;
  signature: string;
}

interface RecordKeeperProps {
  onDataChange?: (data: RecordKeeperData) => void;
}

const RecordKeeper: React.FC<RecordKeeperProps> = ({ onDataChange }) => {
  const [employeeId, setEmployeeId] = useState<string>('356579 - นาย มงคล ธรรมปัญโน');
  const [status, setStatus] = useState<string>('คช 8');
  const [phoneNumber, setPhoneNumber] = useState<string>('098 - 84950689');
  const [showSignature, setShowSignature] = useState<boolean>(false);
  const [signature, setSignature] = useState<string>('');

  const updateData = (newEmployeeId: string, newName: string, newPhoneNumber: string, newSignature: string) => {
    onDataChange?.({
      employeeId: newEmployeeId,
      name: newName,
      phoneNumber: newPhoneNumber,
      signature: newSignature
    });
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmployeeId(newValue);
    updateData(newValue, status, phoneNumber, signature);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStatus(newValue);
    updateData(employeeId, newValue, phoneNumber, signature);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    updateData(employeeId, status, newValue, signature);
  };

  const handleSignatureClick = () => {
    setShowSignature(true);
  };

  const handleSignatureComplete = () => {
    // จำลองลายเซ็น
    const mockSignature = 'ลายเซ็นผู้ปฏิบัติงาน';
    setSignature(mockSignature);
    updateData(employeeId, status, phoneNumber, mockSignature);
    setShowSignature(false);
  };

  return (
    <CardCollapse title="ผู้บันทึกปฏิบัติงาน">
      <div className="p-4 space-y-4">
        <div className="flex flex-row">

        <div className='flex flex-col'>
             
        {/* Employee ID */}
        <div>
          <Label htmlFor="employee-id" className="text-sm font-medium text-gray-700 mb-2 block">
            รหัสผู้บันทึกผลปฏิบัติงาน :
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="employee-id"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              placeholder="รหัสผู้บันทึกผลปฏิบัติงาน"
              className="flex-1 h-[44px] border-[#D1D5DB]"
            />
            
          </div>
        </div>

        {/* Employee Name */}
        <div>
          <Label htmlFor="employee-name" className="text-sm font-medium text-gray-700 mb-2 block">
            ตำแหน่งผู้บันทึกผลปฏิบัติงาน :
          </Label>
          <Input
            id="employee-name"
            value={status}
            onChange={handleNameChange}
            placeholder="ชื่อ-นามสกุล"
            className="h-[44px] border-[#D1D5DB]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phone-number" className="text-sm font-medium text-gray-700 mb-2 block">
            เบอร์โทรผู้บันทึกผลปฏิบัติงาน :
          </Label>
          <Input
            id="phone-number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="หมายเลขโทรศัพท์"
            className="h-[44px] border-[#D1D5DB]"
          />
        </div>
         </div>  
        {/* Signature Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="w-full bg-[#671FAB]  text-white px-4 py-2 rounded-md text-sm text-center">
              ลายเซ็นผู้ปฏิบัติงาน
            </Label>
            
          </div>

          {/* Signature Canvas/Display */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center bg-gray-50">
            {signature ? (
              <div className="text-center">
                <div className="text-2xl font-signature text-gray-700 mb-2">
                  {/* Mock signature display */}
                  <span style={{ fontFamily: 'cursive', fontSize: '24px' }}>
                    ลายเซ็นผู้ปฏิบัติงาน
                  </span>
                </div>
                <p className="text-xs text-gray-500">ลายเซ็นอิเล็กทรอนิกส์</p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <FontAwesomeIcon icon={faPen} className="text-2xl mb-2" />
                <p className="text-sm">คลิกเพื่อเซ็นชื่อ</p>
              </div>
            )}
          </div>
          </div>
        </div>

        

        {/* Mock Signature Modal */}
        {showSignature && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium mb-4">ลายเซ็นผู้ปฏิบัติงาน</h3>
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

export default RecordKeeper;