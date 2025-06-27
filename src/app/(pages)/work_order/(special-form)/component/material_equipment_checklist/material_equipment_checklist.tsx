'use client';
import React, { useState } from 'react';
import { DataTable } from "@/app/components/list/DataTable";
import { getColumns } from "./columns";
import { MaterialEquipmentList } from "@/app/api/MaterialEquipmentApi";

const MaterialEquipmentChecklistPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // ฟังก์ชันสำหรับจัดการการเลือก/ยกเลิกการเลือกรายการ
  const handleToggleSelection = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        // ถ้าเลือกอยู่แล้ว ให้ยกเลิกการเลือก
        return prev.filter(item => item !== id);
      } else {
        // ถ้ายังไม่เลือก ให้เพิ่มเข้าไปในรายการที่เลือก
        return [...prev, id];
      }
    });
  };

  // สร้าง columns โดยส่ง selectedItems และฟังก์ชัน handleToggleSelection
  const columns = getColumns(selectedItems, handleToggleSelection);

  return (
    <div>
      {/* แสดงจำนวนรายการที่เลือก */}
      {selectedItems.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            เลือกรายการแล้ว {selectedItems.length} รายการ
          </p>
          <button 
            onClick={() => setSelectedItems([])}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ยกเลิกการเลือกทั้งหมด
          </button>
        </div>
      )}

      <DataTable 
        columns={columns}
        tableApi={MaterialEquipmentList}
        tableApiData={{search: ''}} // ปรับตาม API ที่ใช้
        emptyData={
          <div className="text-center py-8 text-gray-500">
            <p>ไม่พบข้อมูลวัสดุและอุปกรณ์</p>
          </div>
        }
      />
    </div>
  );
};

export default MaterialEquipmentChecklistPage;