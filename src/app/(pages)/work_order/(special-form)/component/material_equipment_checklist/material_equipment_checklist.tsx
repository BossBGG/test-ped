'use client';
import React, { useState } from 'react';
import { DataTable } from "@/app/components/list/DataTable";
import { getColumns } from "./columns";
import { MaterialEquipmentList } from "@/app/api/MaterialEquipmentApi";
import CardCollapse from '../CardCollapse';
import { DataTableEditor } from "@/app/components/editor-table/DataTableEditor";
import { MaterialEquipmentObj } from "@/types";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-light-svg-icons";

const MaterialEquipmentChecklistPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [materialEquipments, setMaterialEquipments] = useState<MaterialEquipmentObj[]>([
    
  ]);
  
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

  const handleUpdateData = (data: MaterialEquipmentObj[]) => {
    setMaterialEquipments(data);
  };

  const onRemoveData = (id: number) => {
    console.log('Remove data with id:', id);
  };

  // สร้าง columns โดยส่ง selectedItems และฟังก์ชัน handleToggleSelection
  const columns = getColumns(selectedItems, handleToggleSelection);

  const itemMaterialEquipment: MaterialEquipmentObj = {
    id: 0,
    uuid: '',
    code: '',
    name: '',
    quantity: 0,
    unit: 'ชิ้น',
    isActive: true,
    isUpdate: true,
    isEdited: false
  } as MaterialEquipmentObj;

  return (
    <div>
      <CardCollapse title={"รายการวัสดุอุปกรณ์"}>
        <DataTableEditor 
          columns={columns}
          onUpdateData={handleUpdateData}
          realData={materialEquipments}
          rowItem={itemMaterialEquipment}
          LabelAddRow="เพิ่มวัสดุอุปกรณ์"
          onRemoveData={onRemoveData}
          visibleDelete={true}
        />
        
      </CardCollapse>
    </div>
  );
};

export default MaterialEquipmentChecklistPage;