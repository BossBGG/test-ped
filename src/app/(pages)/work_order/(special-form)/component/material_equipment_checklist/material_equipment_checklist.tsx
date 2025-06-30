'use client';
import React, { useState } from 'react';
import { DataTable } from "@/app/components/list/DataTable";
import { getColumns } from "./columns";
import { MaterialEquipmentList } from "@/app/api/MaterialEquipmentApi";
import CardCollapse from '../CardCollapse';
import { DataTableEditor } from "@/app/components/editor-table/DataTableEditor";
import { MaterialEquipmentObj, Options } from "@/types";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { useAppSelector } from "@/app/redux/hook";
import { ListDataEditor } from "@/app/components/editor-table/ListDataEditor";
import MaterialEquipmentListContent from "./MaterialEquipmentListContent";
import AddMaterial from "./AddMaterial";

const MaterialEquipmentChecklistPage = () => {
  const screenSize = useAppSelector(state => state.screen_size);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [materialEquipments, setMaterialEquipments] = useState<MaterialEquipmentObj[]>([
    
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  
  // Mock material options
  const materialOptions: Options[] = [
    {label: 'S-3H-044 - หม้อแปลง3P5000KVA(ร่วม)', value: 'S-3H-044'},
    {label: 'S-3H-045 - หม้อแปลง1P2000KVA', value: 'S-3H-045'},
    {label: 'S-3H-046 - อุปกรณ์ไฟฟ้าอื่นๆ', value: 'S-3H-046'},
  ];
  
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

  const handleAddMaterial = (newMaterial: MaterialEquipmentObj) => {
    setMaterialEquipments(prev => [...prev, newMaterial]);
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
        {
          screenSize === 'desktop'
            ? <DataTableEditor 
                columns={columns}
                onUpdateData={handleUpdateData}
                realData={materialEquipments}
                rowItem={itemMaterialEquipment}
                LabelAddRow="เพิ่มวัสดุอุปกรณ์"
                onRemoveData={onRemoveData}
                visibleDelete={true}
              />
            : <ListDataEditor 
                onUpdateData={handleUpdateData}
                realData={materialEquipments}
              >
                {
                  (pageData: MaterialEquipmentObj[], page, pageSize) =>
                    <div>
                      <MaterialEquipmentListContent 
                        pageData={pageData}
                        realData={materialEquipments}
                        page={page}
                        pageSize={pageSize}
                        onUpdateData={handleUpdateData}
                        materialOptions={materialOptions}
                        onRemoveData={onRemoveData}
                        setUpdateIndex={(index) => {
                          setUpdateIndex(index)
                          setOpenModal(true)
                        }}
                      />

                      <Button className="pea-button-outline my-2 w-full"
                              onClick={() => setOpenModal(true)}
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                        เพิ่มวัสดุอุปกรณ์
                      </Button>
                    </div>
                }
              </ListDataEditor>
        }
        
       
      </CardCollapse>

      {/* Add Material Modal */}
      <AddMaterial 
        open={openModal}
        onClose={() => setOpenModal(false)}
        index={updateIndex}
        onAddMaterial={handleAddMaterial}
      />
    </div>
  );
};

export default MaterialEquipmentChecklistPage;