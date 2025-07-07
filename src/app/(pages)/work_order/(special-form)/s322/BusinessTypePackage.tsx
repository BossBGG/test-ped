import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faX } from "@fortawesome/pro-light-svg-icons";
import { useAppSelector } from "@/app/redux/hook";

// Types
interface PackageFeature {
  id: number;
  name: string;
  package1: boolean;
  package2: boolean;
  package3: boolean;
  package4: boolean;
}

interface PackageData {
  id: string;
  name: string;
  price: number;
  features: PackageFeature[];
}

interface BusinessTypePackageProps {
  value?: string;
  onChange?: (value: string) => void;
}

// Mock data for packages
const packageFeatures: PackageFeature[] = [
  {
    id: 1,
    name: "ตรวจสอบอุณหภูมิสภาพปกติไฟฟ้าและจุดร้อนด้วยกล้อง Thermal Viewer",
    package1: true,
    package2: true,
    package3: true,
    package4: false
  },
  {
    id: 2,
    name: "ปรับจูนค่าการปกครองและอุปสมานลักษณ์ไฟร์อล่อน",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 3,
    name: "ตรวจสอบและแก้ไขการกราวิต",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 4,
    name: "ปรับจูนค่าผลการมือลอง",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 5,
    name: "ปรับจูนค่าผู้ MOB",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 6,
    name: "ติดตั้งไฟไล่แมลงคารไฟ",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 7,
    name: "ตรวจจุดอ่อนและซ่อมแซ่น",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 8,
    name: "ตรวจสอบข้อมูลทรดไฟฟ้าอ (Load Profile)",
    package1: true,
    package2: false,
    package3: false,
    package4: false
  },
  {
    id: 9,
    name: "ให้คำแนะนำการชื่นฤทัยพล่วิงน่าน และการวบบปองคอมฟ",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 10,
    name: "จัดทำรายงานผลการตรวจสอบและแจกจ่ายคำจำทั่วคำวิเคราะห์",
    package1: true,
    package2: true,
    package3: true,
    package4: true
  },
  {
    id: 11,
    name: "ตรวจสอบจุดอ่อนที่ทำการผลไฟฟ้าย์ในโครงส่านทับอาร์",
    package1: true,
    package2: true,
    package3: true,
    package4: false
  }
];

const packages: PackageData[] = [
  { id: "package1", name: "Package 1", price: 35000, features: packageFeatures },
  { id: "package2", name: "Package 2", price: 25000, features: packageFeatures },
  { id: "package3", name: "Package 3", price: 20000, features: packageFeatures },
  { id: "package4", name: "Package 4", price: 10000, features: packageFeatures }
];

// Package Detail Component
const PackageDetail: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: PackageData;
  onSelectPackage?: (packageId: string) => void;
}> = ({ isOpen, onClose, selectedPackage, onSelectPackage }) => {
  const screenSize = useAppSelector(state => state.screen_size);
  const [activeTab, setActiveTab] = useState("package1");

  const getFeatureStatus = (feature: PackageFeature, packageId: string) => {
    switch (packageId) {
      case "package1": return feature.package1;
      case "package2": return feature.package2;
      case "package3": return feature.package3;
      case "package4": return feature.package4;
      default: return false;
    }
  };

  // Mobile Layout
  if (screenSize === 'mobile') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                รายละเอียด Package
              </DialogTitle>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faX} className="text-gray-500" />
              </button>
            </div>
          </DialogHeader>

          {/* Package Tabs */}
          <div className="flex gap-1 px-4 mb-4">
            {packages.map((pkg, index) => (
              <button
                key={pkg.id}
                onClick={() => setActiveTab(pkg.id)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === pkg.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-600'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4">
            {packages
              .filter(pkg => pkg.id === activeTab)
              .map(pkg => (
                <div key={pkg.id} className="space-y-3 pb-4">
                  {packageFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
                        {getFeatureStatus(feature, pkg.id) ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faTimes} className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-800 leading-relaxed">
                          <span className="font-medium">{feature.id}.</span> {feature.name}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Price */}
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      ราคา: {pkg.price.toLocaleString()} บาท
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Footer Button */}
          <div className="p-4 border-t">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              onClick={() => {
                onSelectPackage?.(activeTab);
                onClose();
              }}
            >
              นำ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop Layout
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              รายละเอียด Package
            </DialogTitle>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faX} className="text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6 pt-0">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            <div className="col-span-2">
              <div className="flex bg-purple-100 rounded-lg">
                <div className="flex-1 p-3 text-center font-medium text-purple-600">
                  ก่อนที่ -
                </div>
                <div className="flex-1 p-3 text-center font-medium text-purple-600">
                  ก่อรหรง
                </div>
              </div>
            </div>
            {packages.map((pkg) => (
              <div key={pkg.id} className="text-center">
                <div className="bg-purple-600 text-white p-3 rounded-lg font-medium">
                  {pkg.name}
                </div>
              </div>
            ))}
          </div>

          {/* Features Table */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {packageFeatures.map((feature) => (
              <div key={feature.id} className="grid grid-cols-6 gap-4 items-center py-2">
                <div className="col-span-2 text-sm text-gray-700">
                  <span className="font-medium">{feature.id}</span> {feature.name}
                </div>
                {packages.map((pkg) => (
                  <div key={pkg.id} className="text-center">
                    {getFeatureStatus(feature, pkg.id) ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                        <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-6 gap-4 mt-6 pt-4 border-t">
            <div className="col-span-2 text-center font-medium text-gray-700">
              ราคา
            </div>
            {packages.map((pkg) => (
              <div key={pkg.id} className="text-center">
                <div className="font-bold text-lg text-purple-600">
                  {pkg.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Button */}
          <div className="mt-6 text-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full"
              onClick={onClose}
            >
              นำ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Business Type Package Component
const BusinessTypePackage: React.FC<BusinessTypePackageProps> = ({ 
  value = '', 
  onChange 
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [showPackageDetail, setShowPackageDetail] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const screenSize = useAppSelector(state => state.screen_size);

  const businessOptions = [
    { value: 'manufacturing', label: 'ธุรกิจการผลิต' },
    { value: 'trading', label: 'ธุรกิจการค้า' },
    { value: 'service', label: 'ธุรกิจบริการ' },
    { value: 'agriculture', label: 'ธุรกิจการเกษตร' },
    { value: 'technology', label: 'ธุรกิจเทคโนโลยี' },
    { value: 'other', label: 'อื่นๆ' }
  ];

  const packageOptions = [
    { value: 'package1', label: 'Package 1' },
    { value: 'package2', label: 'Package 2' },
    { value: 'package3', label: 'Package 3' },
    { value: 'package4', label: 'Package 4' }
  ];

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const handlePackageSelect = (packageId: string) => {
    handleValueChange(packageId);
    setShowPackageDetail(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
      case 1:
      case 2:
        // Steps 0, 1, 2 - Show business type selector
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="business-type" className="text-sm font-medium text-gray-700">
                ประเภทธุรกิจ
              </Label>
              <Select value={selectedValue} onValueChange={handleValueChange}>
                <SelectTrigger className="w-full h-[44px] border-[#D1D5DB]">
                  <SelectValue placeholder="ผ่านอยู่ก่าย" />
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
          </div>
        );

      case 3:
        // Step 3 - Show package selector with detail link
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
            <div className="space-y-4">
              {/* Package Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="package" className="text-sm font-medium text-gray-700">
                    Package
                  </Label>
                  <button
                    onClick={() => setShowPackageDetail(true)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium underline"
                  >
                    รายละเอียด Package
                  </button>
                </div>
                <Select value={selectedValue} onValueChange={handleValueChange}>
                  <SelectTrigger className="w-full h-[44px] border-[#D1D5DB]">
                    <SelectValue placeholder="Package 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStepContent()}
      
      <PackageDetail
        isOpen={showPackageDetail}
        onClose={() => setShowPackageDetail(false)}
        onSelectPackage={handlePackageSelect}
      />
    </>
  );
};

export { BusinessTypePackage, PackageDetail };