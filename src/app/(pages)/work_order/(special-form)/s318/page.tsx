"use client";
import { useBreadcrumb } from "@/app/context/BreadcrumbContext";
import { useEffect, useState } from "react";
import WorkOrderInfo from "@/app/(pages)/work_order/(special-form)/component/WorkOrderInfo";
import { Customer, MeterEquipment, WorkerObj, WorkOrderObj } from "@/types";
import WorkOrderBreadcrumb from "@/app/(pages)/work_order/(special-form)/component/breadcrumb";
import WorkOrderStep from "@/app/(pages)/work_order/(special-form)/component/WorkOrderStep";
import CustomerInfo from "@/app/(pages)/work_order/(special-form)/component/CustomerInfo";
import ElectricalList from "@/app/(pages)/work_order/(special-form)/s318/electrical-list";
import { useAppSelector } from "@/app/redux/hook";
import WorkOrderStepMobile from "@/app/(pages)/work_order/(special-form)/component/WorkOrderStepMobile";
import {
  faFile,
  faPen,
  faScrewdriver,
  faUser,
} from "@fortawesome/pro-light-svg-icons";
import WorkerList from "@/app/(pages)/work_order/(special-form)/component/worker/WorkerList";
import MaterialEquipmentChecklistPage from "../component/material_equipment_checklist/material_equipment_checklist";
import WorkExecution from "../component/work_execution/work_execution";
import AddImages from "../component/work_execution/add_images";
import AddFile from "../component/work_execution/add_file";
import Comment from "../component/work_execution/comment";
import SatisfactionAssessment from "../component/work_execution/satisfaction_assessment";
import RecordKeeper from "../component/work_execution/record_keeper";
import { useRouter } from "next/navigation";


import RatingAndComment from "../component/work_execution/RatingAndComment ";
import SignatureSection from "../component/work_execution/signature_section";
import CardCollapse from "../component/CardCollapse";
import WorkOrderActionButtons from "../component/WorkOrderActionBunttons";
import BusinessType from "../component/work_execution/business_type";




const ElectricalRepairOrderS318 = () => {
  const { setBreadcrumb } = useBreadcrumb();
  const router = useRouter();
  const [data, setData] = useState<WorkOrderObj>({
    customer_info: {} as Customer,
    meterequipment: [] as MeterEquipment[],
    workers: [] as WorkerObj[],
  } as WorkOrderObj);
  const screenSize = useAppSelector((state) => state.screen_size);
  const [currentStep, setCurrentStep] = useState(0);

  // States for mobile satisfaction assessment
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [customerSignature, setCustomerSignature] = useState<string>("");
  const [recordKeeperSignature, setRecordKeeperSignature] = useState<string>("");

  const steps = [
    { name: "ข้อมูลลูกค้า", icon: faPen },
    { name: "ผู้ปฏิบัติงาน", icon: faUser },
    { name: "อุปกรณ์ปฏิบัติงาน", icon: faScrewdriver },
    { name: "ผลปฏิบัติงาน", icon: faFile },
  ];

  useEffect(() => {
    setBreadcrumb(
      <WorkOrderBreadcrumb
        title={"สร้างใบสั่งงาน ขอทดสอบอุปกรณ์ไฟฟ้า"}
        path={"s312"}
      />
    );
  }, [setBreadcrumb]);

  const updateCustomerInfo = (value: Customer) => {
    data.customer_info = value;
    setData(data);
  };

  const updateElectrical = (value: MeterEquipment[]) => {
    data.meterequipment = value;
    setData(data);
    console.log("data >>> ", data);
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCancel = () => {
    // Logic สำหรับยกเลิกใบสั่งงาน
    router.push("/work_order");
  };

  const handleConfirm = () => {
    // Logic สำหรับยืนยันสร้างใบสั่งงาน
    console.log("Confirm create work order");
  };

  const handleComplete = () => {
    // Logic สำหรับจบงาน
    console.log("Complete work order");
  };

  const handleSave = () => {
    // Logic สำหรับบันทึก
    console.log("Save work order");
  };

  // Handlers for mobile satisfaction assessment
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    // Limit to 50 words for mobile
    const words = newComment.trim().split(/\s+/);
    if (words.length <= 50) {
      setComment(newComment);
    }
  };

  const handleCustomerSignatureChange = (newSignature: string) => {
    setCustomerSignature(newSignature);
  };

  const handleRecordKeeperSignatureChange = (newSignature: string) => {
    setRecordKeeperSignature(newSignature);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <CustomerInfo
              data={data.customer_info}
              updateData={updateCustomerInfo}
            />

            <BusinessType/>
            
            <ElectricalList
              data={data.meterequipment}
              updateData={updateElectrical}
            />

            
          </div>
        );

      case 1:
        return <WorkerList data={data.workers} />;

      case 2:
        return <MaterialEquipmentChecklistPage />;

      case 3:
        return (
          <div>
            <WorkExecution />
            <BusinessType/>
            <ElectricalList
              data={data.meterequipment}
              updateData={updateElectrical}
            />
            <AddImages />
            <AddFile />
            <Comment />

            {/* Render different components based on screen size */}
            {screenSize === "mobile" ? (
              <>
                {/* Mobile version - separate components with CardCollapse */}
                <CardCollapse title="ผลการประเมินความพึงพอใจของลูกค้าต่อการปฏิบัติงาน">
                  <div className="p-4">
                    <RatingAndComment
                      rating={rating}
                      comment={comment}
                      onRatingChange={handleRatingChange}
                      onCommentChange={handleCommentChange}
                    />

                    {/* Show word count for mobile (max 50 words) */}
                    <div className="flex justify-end mt-2">
                      <span
                        className={`text-sm ${
                          comment.trim().split(/\s+/).length > 45
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {
                          comment
                            .trim()
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length
                        }
                        /50 คำ
                      </span>
                    </div>
                  </div>
                </CardCollapse>

                <CardCollapse title="ลายเซ็นลูกค้า">
                  <div className="p-4">
                    <SignatureSection
                      title="ภาพลายเซ็นลูกค้า"
                      signature={customerSignature}
                      onSignatureChange={handleCustomerSignatureChange}
                    />
                  </div>
                </CardCollapse>

                <CardCollapse title="ลายเซ็นผู้บันทึกปฏิบัติงาน">
                  <div className="p-4">
                    <SignatureSection
                      title="ภาพลายเซ็นผู้บันทึกปฏิบัติงาน"
                      signature={recordKeeperSignature}
                      onSignatureChange={handleRecordKeeperSignatureChange}
                    />
                  </div>
                </CardCollapse>
              </>
            ) : (
              <>
                {/* Desktop version - keep original components */}
                <SatisfactionAssessment />
                <RecordKeeper />
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <WorkOrderInfo data={data} />

      {screenSize === "desktop" ? (
        <WorkOrderStep
          steps={steps}
          currentStep={currentStep}
          updateStep={setCurrentStep}
        />
      ) : (
        <WorkOrderStepMobile
          steps={steps}
          currentStep={currentStep}
          updateStep={setCurrentStep}
        />
      )}

      {renderCurrentStep()}

      {/* แทนที่ {renderActionButtons()} ด้วย WorkOrderActionButtons */}
      <WorkOrderActionButtons
        currentStep={currentStep}
        totalSteps={steps.length}
        onGoBack={handleGoBack}
        onNext={handleNext}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onComplete={handleComplete}
        onSave={handleSave}
      />
    </div>
  );
};

export default ElectricalRepairOrderS318;