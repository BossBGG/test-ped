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
import WorkExecution from "../component/work_execution/work_execution";
import AddImages from "../component/work_execution/add_images";
import AddFile from "../component/work_execution/add_file";
import Comment from "../component/work_execution/comment";
import SatisfactionAssessment from "../component/work_execution/satisfaction_assessment";
import RecordKeeper from "../component/work_execution/record_keeper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-light-svg-icons";
import { useRouter } from "next/navigation";

const ElectricalRepairOrderS301 = () => {
  const {setBreadcrumb} = useBreadcrumb()
  const router = useRouter();
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
    setBreadcrumb(<WorkOrderBreadcrumb title={'สร้างใบสั่งงาน ขอซ่อมแซมอุปกรณ์ไฟฟ้า'} path={'s301'}/>)
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

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const handleCancel = () => {
    // Logic สำหรับยกเลิกใบสั่งงาน
    router.push('/work_order');
  }

  const handleConfirm = () => {
    // Logic สำหรับยืนยันสร้างใบสั่งงาน
    console.log('Confirm create work order');
  }

  const handleComplete = () => {
    // Logic สำหรับจบงาน
    console.log('Complete work order');
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

      case 3:
        return (
          <div>
            <WorkExecution/>

            <AddImages/>
            <AddFile/>
            <Comment/>
            <SatisfactionAssessment/>
            <RecordKeeper/>
          </div>
        );
      
      default:
        return null;
    }
  }

  const renderActionButtons = () => {
    const commonButtonClass = "h-[44px] px-6 font-medium";
    
    return (
      <div className="flex justify-between items-center mt-6">
        {/* Left side buttons */}
        <div className="flex items-center space-x-3">
          <Button 
            className={`${commonButtonClass} pea-button-outline`} 
            variant="outline"
            onClick={handleGoBack}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            ย้อนกลับ
          </Button>
          
          
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          <Button 
            className={`${commonButtonClass} cancel-button`} 
            variant="outline"
            onClick={handleCancel}
          >
            ยกเลิกใบสั่งงาน
          </Button>

          <Button 
            className={`${commonButtonClass} pea-button-outline`} 
            variant="outline"
          >
            บันทึก
          </Button>
          
          {currentStep === 2 ? (
            <Button 
              className={`${commonButtonClass} pea-button`}
              onClick={handleConfirm}
            >
              ยืนยันสร้างใบสั่งงาน
            </Button>
          ) : currentStep === 3 ? (
            <Button 
              className={`${commonButtonClass} pea-button`}
              onClick={handleComplete}
            >
              จบงาน
            </Button>
          ) : (
            <Button 
              className={`${commonButtonClass} pea-button`}
              onClick={handleNext}
            >
              ถัดไป
            </Button>
          )}
        </div>
      </div>
    );
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

      {renderActionButtons()}
    </div>
  )
}

export default ElectricalRepairOrderS301;