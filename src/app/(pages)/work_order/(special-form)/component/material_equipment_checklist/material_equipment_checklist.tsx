'use client';
import React, { useState } from 'react';
import { DataTable } from "@/app/components/list/DataTable";
import { getColumns } from "./columns";
import { MaterialEquipmentList } from "@/app/api/MaterialEquipmentApi";
import CardCollapse from '../CardCollapse';

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
      
      <CardCollapse title={"ผลการปฏิบัติงาน"}>
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
      </CardCollapse>
    </div>
  );
};

export default MaterialEquipmentChecklistPage;