'use client';
import {useBreadcrumb} from "@/app/context/BreadcrumbContext";
import {useEffect, useState} from "react";
import WorkOrderInfo from "@/app/(pages)/work_order/(special-form)/component/WorkOrderInfo";
import {Customer, Electrical, WorkerObj, WorkOrderObj} from "@/types";
import WorkOrderBreadcrumb from "@/app/(pages)/work_order/(special-form)/component/breadcrumb";
import WorkOrderStep from "@/app/(pages)/work_order/(special-form)/component/WorkOrderStep";
import CustomerInfo from "@/app/(pages)/work_order/(special-form)/component/CustomerInfo";
import ElectricalList from "@/app/(pages)/work_order/(special-form)/s301/electrical-list";
import {Button} from "@/components/ui/button";
import {useAppSelector} from "@/app/redux/hook";
import WorkOrderStepMobile from "@/app/(pages)/work_order/(special-form)/component/WorkOrderStepMobile";
import {faFile, faPen, faScrewdriver, faUser} from "@fortawesome/pro-light-svg-icons";
import WorkerList from "@/app/(pages)/work_order/(special-form)/component/worker/WorkerList";
import MaterialEquipmentChecklistPage from "../component/material_equipment_checklist/material_equipment_checklist";


const ElectricalRepairOrderS301 = () => {
  const {setBreadcrumb} = useBreadcrumb()
  const [data, setData] = useState<WorkOrderObj>({
    customer_info: {} as Customer,
    electrical: [] as Electrical[],
    workers: [] as WorkerObj[]
  } as WorkOrderObj);
  const screenSize = useAppSelector(state => state.screen_size)
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { name: 'ข้อมูลลูกค้า', icon: faPen },
    { name: 'ผู้ปฏิบัติงาน', icon: faUser },
    { name: 'อุปกรณ์ปฏิบัติงาน', icon: faScrewdriver },
    { name: 'ผลปฏิบัติงาน', icon: faFile },
  ]

  useEffect(() => {
    setBreadcrumb(<WorkOrderBreadcrumb title={'สร้างใบสั่งงาน ขอตรวจสอบและบำรุงรักษาสวิตซ์เกียร์'} path={'s302'}/>)
  }, [setBreadcrumb])

  const updateCustomerInfo = (value: Customer) => {
    data.customer_info = value
    setData(data)
  }

  const updateElectrical = (value: Electrical[]) => {
    data.electrical = value
    setData(data)
    console.log('data >>> ', data )
  }

  // ฟังก์ชันสำหรับอัพเดท selectedItems กลับไปยัง parent component (ถ้าต้องการ)
  const updateSelectedMaterialEquipment = (selectedIds: string[]) => {
    // สามารถเก็บ selectedIds ไว้ใน state หรือส่งไปยัง API ได้
    console.log('Selected Material Equipment IDs:', selectedIds);
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <CustomerInfo data={data.customer_info}
                          updateData={updateCustomerInfo}
            />
            
            <ElectricalList data={data.electrical}
                            updateData={updateElectrical}
            />
          </div>
        );
      
      case 1:
        return <WorkerList data={data.workers}/>;
      
      case 2:
        return <MaterialEquipmentChecklistPage/>;
      
     
      
      default:
        return null;
    }
  }

  return (
    <div>
      <WorkOrderInfo data={data}/>

      {
        screenSize === 'desktop'
          ? <WorkOrderStep steps={steps} currentStep={currentStep} updateStep={setCurrentStep}/>
          : <WorkOrderStepMobile steps={steps} currentStep={currentStep} updateStep={setCurrentStep}/>
      }

      {renderCurrentStep()}

      <div className="flex justify-end items-center">
        <Button className="pea-button-outline mr-2" variant="outline">บันทึก</Button>
        <Button className="pea-button">ถัดไป</Button>
      </div>
    </div>
  )
}

export default ElectricalRepairOrderS301;