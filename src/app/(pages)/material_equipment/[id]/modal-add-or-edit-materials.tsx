import Modal from "@/app/layout/Modal";
import {Button} from "@/components/ui/button";
import InputSelect from "@/app/components/form/InputSelect";
import {MaterialEquipmentObj, Options} from "@/types";
import InputText from "@/app/components/form/InputText";
import {useEffect, useState} from "react";

const FooterModal = ({
                       cancel,
                       submit
                     }:
                     {
                       cancel: () => void,
                       submit: () => void,
                     }) => (
  <div className="w-full flex flex-wrap justify-between items-center">
    <div className="p-2 w-1/2">
      <Button
        className="text-[#671FAB] w-full bg-white border-1 border-[#671FAB] rounded-full font-semibold md:text-start text-center cursor-pointer"
        onClick={() => cancel()}
      >
        ยกเลิก
      </Button>
    </div>
    <div className="p-2 w-1/2">
      <Button className="pea-button w-full" onClick={() => submit()}>
        บันทึก
      </Button>
    </div>
  </div>
)

interface ModalAddOrEditMaterialsProps {
  open: boolean,
  onClose: () => void,
  equipmentCodeOptions: Options[],
  equipmentNameOptions: Options[],
  equipmentUnitOptions: Options[],
  data: MaterialEquipmentObj[],
  onUpdate: (data: MaterialEquipmentObj[]) => void,
  index: number,
  setUpdateIndex:(index: number) => void,
}

const ModalAddOrEditMaterials = ({
                                   open,
                                   onClose,
                                   equipmentCodeOptions,
                                   equipmentNameOptions,
                                   equipmentUnitOptions,
                                   data,
                                   onUpdate,
                                   index,
                                   setUpdateIndex
                                 }: ModalAddOrEditMaterialsProps) => {
  const [item, setItem] = useState<MaterialEquipmentObj>({} as MaterialEquipmentObj);

  useEffect(() => {
    console.log('index >>>> ', index);
    if(index > -1) {
      setItem(data[index]);
    }
  }, [index])

  const submit = () => {
    if(index === -1) {
      data.push(item)
    }else {
      data[index] = {
        ...item,
        isEdited: true,
      }
    }

    onUpdate(data)
    cancel()
  }

  const handleUpdate = (key: string, value: string | number) => {
    setItem(prev => (
      {...prev, [key]: value}
    ))
  }

  const cancel = () => {
    setUpdateIndex(-1)
    setItem({} as MaterialEquipmentObj)
    onClose()
  }

  return (
    <Modal title={index > -1 ? 'แก้ไขอุปกรณ์' : 'เพิ่มอุปกรณ์'}
           footer={<FooterModal cancel={cancel} submit={submit}/>}
           open={open}
           onClose={cancel}
    >
      <InputSelect options={equipmentCodeOptions}
                   value={item.code}
                   placeholder={'ค้นหารหัสวัสดุ'}
                   setData={(v) => handleUpdate('code', v)}
                   label="รหัสวัสดุ"
      />

      <InputSelect options={equipmentNameOptions}
                   value={item.name}
                   placeholder={'ชื่ออุปกรณ์'}
                   setData={(v) => handleUpdate('name', v)}
                   label="ชื่ออุปกรณ์"
      />

      <InputText placeholder={'ระบุจำนวน'}
                 label="จำนวน"
                 onChange={(v) => handleUpdate('quantity', v)}
                 value={item.quantity}
                 numberOnly={true}
      />

      <InputSelect options={equipmentUnitOptions}
                   value={item.unit}
                   placeholder={'หน่วย'}
                   setData={(v) => handleUpdate('unit', v)}
                   label="จำนวนหน่วย"
      />
    </Modal>
  )
}

export default ModalAddOrEditMaterials;
