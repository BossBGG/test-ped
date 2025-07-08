import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faX } from "@fortawesome/pro-light-svg-icons";
import { useAppSelector } from "@/app/redux/hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef
} from "@tanstack/react-table";

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

interface PackageDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: PackageData;
  onSelectPackage?: (packageId: string) => void;
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

// Table Columns Definition
const packageColumns: ColumnDef<PackageFeature>[] = [
  {
    accessorKey: "id",
    header: "ลำดับที่",
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("id")}</div>
    },
  },
  {
    accessorKey: "name",
    header: "กิจกรรม",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("name")}</div>
    }
  },
  {
    accessorKey: "package1",
    header: "Package 1",
    cell: ({ row }) => {
      const isIncluded = row.getValue("package1") as boolean;
      return (
        <div className="flex justify-center">
          {isIncluded ? (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "package2",
    header: "Package 2",
    cell: ({ row }) => {
      const isIncluded = row.getValue("package2") as boolean;
      return (
        <div className="flex justify-center">
          {isIncluded ? (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "package3",
    header: "Package 3",
    cell: ({ row }) => {
      const isIncluded = row.getValue("package3") as boolean;
      return (
        <div className="flex justify-center">
          {isIncluded ? (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "package4",
    header: "Package 4",
    cell: ({ row }) => {
      const isIncluded = row.getValue("package4") as boolean;
      return (
        <div className="flex justify-center">
          {isIncluded ? (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
          )}
        </div>
      );
    }
  }
];

// Package Detail Component with Table
const PackageDetailWithTable: React.FC<PackageDetailProps> = ({ 
  isOpen, 
  onClose, 
  selectedPackage, 
  onSelectPackage 
}) => {
  const screenSize = useAppSelector(state => state.screen_size);
  const [activeTab, setActiveTab] = useState("package1");

  // Table setup
  const table = useReactTable({
    data: packageFeatures,
    columns: packageColumns,
    getCoreRowModel: getCoreRowModel(),
  });

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
              ปิด
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop Layout - Table format ตามรูป design
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="p-0 overflow-hidden"
        style={{ 
          maxWidth: 'none', 
          width: '95vw', 
          maxHeight: '90vh',
          minWidth: '1200px' 
        }}
      >
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
          {/* Table using react-table with scroll */}
          <div className="rounded-lg border overflow-hidden">
            {/* Table Container with Scroll */}
            <div className="max-h-96 overflow-y-auto">
              <Table className="w-full table-auto" style={{ minWidth: '1100px' }}>
                <TableHeader className="sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="bg-purple-600 hover:bg-purple-600">
                      {headerGroup.headers.map((header, index) => (
                        <TableHead 
                          key={header.id} 
                          className="text-white font-medium text-center border-r border-purple-500 last:border-r-0 px-4 py-3"
                          style={{
                            width: index === 0 ? '80px' : 
                                   index === 1 ? '400px' : 
                                   '140px',
                            minWidth: index === 0 ? '80px' : 
                                     index === 1 ? '400px' : 
                                     '140px'
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())
                          }
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => (
                          <TableCell 
                            key={cell.id} 
                            className="border-r border-gray-200 last:border-r-0 px-4 py-3"
                            style={{
                              width: cellIndex === 0 ? '80px' : 
                                     cellIndex === 1 ? '400px' : 
                                     '140px',
                              minWidth: cellIndex === 0 ? '80px' : 
                                       cellIndex === 1 ? '400px' : 
                                       '140px',
                              textAlign: cellIndex === 0 || cellIndex > 1 ? 'center' : 'left'
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={packageColumns.length} className="h-24 text-center">
                        ไม่มีข้อมูล
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

           
            
            
          </div>

          {/* Footer Button */}
          <div className="mt-6 text-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full"
              onClick={onClose}
            >
              ปิด
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailWithTable;