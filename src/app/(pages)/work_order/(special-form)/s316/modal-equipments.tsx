import Modal from "@/app/layout/Modal";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import InputSelect from "@/app/components/form/InputSelect";
import {MaterialEquipmentObj, Options} from "@/types";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import InputText from "@/app/components/form/InputText";
import { Button } from "@/components/ui/button";

interface ModalEquipmentsProps {
  open: boolean,
  onClose: () => void,
  index: number
  onAddEquipment?: (equipment: MaterialEquipmentObj) => void,
}

const ModalEquipments = ({
                           open,
                           onClose,
                           index,
                           onAddEquipment
                         }: ModalEquipmentsProps) => {
  const [active, setActive] = useState(0);
  const [material, setMaterial] = useState('');
  const [equipmentSelected, setEquipmentSelected] = useState<number[]>([]);
  const [materialOptions, setMaterialOptions] = useState<Options[]>([
    {value: 'ชุดตรวจสอบและบำรุงหม้อแปลง', label: 'ชุดตรวจสอบและบำรุงหม้อแปลง'}
  ])

  const [equipmentList, setEquipmentList] = useState<MaterialEquipmentObj[]>([
    {name: 'หม้อแปลง A', quantity: 1, id: 1, isEdited: false} as MaterialEquipmentObj,
    {name: 'หม้อแปลง B', quantity: 1, id: 2, isEdited: false} as MaterialEquipmentObj,
    {name: 'หม้อแปลง C', quantity: 1, id: 3, isEdited: false} as MaterialEquipmentObj,
  ]);

  const classActive = 'text-[#671FAB] bg-[#F4EEFF]';
  const classDefault = 'w-full text-center p-2 font-semibold rounded-full';
  const tabs = ['ชุดติดตั้งอุปกรณ์', 'ค้นหาจากรหัส/ชื่อ']

  useEffect(() => {
    //TODO call api get equipment list
    console.log(material);
  }, [material]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      let items: number[] = equipmentList.map((eq) => {
        return eq.id
      })
      setEquipmentSelected(items)
    } else {
      setEquipmentSelected([])
    }
  }

  const handleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setEquipmentSelected([...equipmentSelected, id])
    } else {
      setEquipmentSelected(equipmentSelected.filter((item) => item !== id))
    }
  }

  const handleSubmit = () => {
    const selectedEquipments = equipmentList.filter((equipment) => 
      equipmentSelected.includes(equipment.id)
    );

    selectedEquipments.forEach((equipment) => {
      onAddEquipment?.(equipment);
    });

    // Reset selections
    setEquipmentSelected([]);
    setMaterial("");
    onClose();
  }

  const handleCancel = () => {
    setEquipmentSelected([]);
    setMaterial("");
    onClose();
  }

  return (
    <Modal title="เพิ่มวัสดุอุปกรณ์"
           footer={
            <div className="w-full flex flex-wrap justify-between items-center">
              <div className=" p-2 w-1/2">
              <Button
              className="text-[#671FAB] w-full bg-white border-1 border-[#671FAB] rounded-full font-semibold md:text-start text-center cursor-pointer hover:bg-white"
              onClick={handleCancel}
              >
                ยกเลิก
              </Button>
              </div>
               <div className=" p-2 w-1/2">
               <Button className="pea-button w-full" onClick={handleSubmit}>
                บันทึก
               </Button>
              </div>
           </div>
           }
           open={open} onClose={onClose}>
      <div className="flex items-center p-1 bg-[#F8F8F8] rounded-full">
        {
          tabs.map((tab, index) => (
            <div className={cn(classDefault, active === index && classActive)}
                 onClick={() => {
                   setActive(index)
                 }}
                 key={index}
            >
              {tab}
            </div>
          ))
        }
      </div>

      <InputSelect options={materialOptions}
                   value={material}
                   placeholder={active === 0 ? 'ค้นหาชุดติดตั้งอุปกรณ์' : 'ค้นหารหัสวัสดุหรือชื่อวัสดุ'}
                   label={active === 0 ? 'ค้นหาชุดติดตั้งอุปกรณ์' : 'ค้นหารหัสวัสดุหรือชื่อวัสดุ'}
                   setData={setMaterial}
      />


      <hr className="my-3"/>

      <div className="mb-3">รายการวัสดุ ({equipmentList.length || 0})</div>

      <div className="flex items-center gap-3">
        <Checkbox id="all"
                  className="border-[#9538EA] data-[state=checked]:border-none data-[state=checked]:bg-[#9538EA]"
                  onCheckedChange={handleSelectAll}
        />
        <Label htmlFor="all">เลือกทั้งหมด</Label>
      </div>

      {
        equipmentList.map((item, index) => (
          <div className="flex items-center p-3 bg-[#FAF5FF] rounded-[12px] border-1 gap-3"
               key={index}
          >
            <Checkbox id={`equipment_${index}`}
                      className="border-[#9538EA] data-[state=checked]:border-none data-[state=checked]:bg-[#9538EA]"
                      checked={equipmentSelected.includes(item.id)}
                      onCheckedChange={(checked: boolean) => handleCheck(checked, item.id)}
            />
            <Label htmlFor={`equipment_${index}`} className="flex flex-col items-start w-full">
              <div>{item.name}</div>
              <div className="flex justify-between items-center w-full">
                <div className="text-[14px] text-[#4A4A4A]">จำนวน :</div>
                <div className="w-[15%]">
                  <InputText value={item.quantity}
                             align="center"
                  />
                </div>
              </div>
            </Label>
          </div>
        ))
      }
    </Modal>
  )
}

export default ModalEquipments;
