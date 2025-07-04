import React from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-light-svg-icons";
import { useAppSelector } from "@/app/redux/hook";

interface WorkOrderActionButtonsProps {
  currentStep: number;
  totalSteps: number;
  onGoBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onComplete: () => void;
  onSave?: () => void;
  // Optional: custom button texts
  confirmText?: string;
  completeText?: string;
  nextText?: string;
  saveText?: string;
  cancelText?: string;
  backText?: string;
  // Optional: hide specific buttons
  showSaveButton?: boolean;
  showCancelButton?: boolean;
}

const WorkOrderActionButtons: React.FC<WorkOrderActionButtonsProps> = ({
  currentStep,
  totalSteps,
  onGoBack,
  onNext,
  onCancel,
  onConfirm,
  onComplete,
  onSave,
  // Default texts
  confirmText = "ยืนยันสร้างใบสั่งงาน",
  completeText = "จบงาน",
  nextText = "ถัดไป",
  saveText = "บันทึก",
  cancelText = "ยกเลิกใบสั่งงาน",
  backText = "ย้อนกลับ",
  // Default visibility
  showSaveButton = true,
  showCancelButton = true,
}) => {
  const screenSize = useAppSelector((state) => state.screen_size);
  const commonButtonClass = "h-[44px] px-6 font-medium";

  // Determine which button to show based on current step
  const isConfirmStep = currentStep === totalSteps - 2; // Second to last step
  const isCompleteStep = currentStep === totalSteps - 1; // Last step

  // Mobile Layout
  if (screenSize === "mobile") {
    return (
      <div className="flex flex-col space-y-3 mt-6">
        {/* First Row - Back and Main Action */}
        <div className="flex space-x-3">
          <Button
            className={`${commonButtonClass} pea-button-outline flex-1`}
            variant="outline"
            onClick={onGoBack}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            {backText}
          </Button>

          {isConfirmStep ? (
            <Button
              className={`${commonButtonClass} bg-[var(--pea-button-bg-color)] border border-[var(--pea-button-bg-color)] rounded-[1.5rem] px-3 py-2.5 text-[var(--background)] cursor-pointer`}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          ) : isCompleteStep ? (
            <Button
              className={`${commonButtonClass} pea-button flex-1`}
              onClick={onComplete}
            >
              {completeText}
            </Button>
          ) : (
            <Button
              className={`${commonButtonClass} pea-button flex-1`}
              onClick={onNext}
            >
              {nextText}
            </Button>
          )}
        </div>

        {/* Second Row - Save Button */}
        {showSaveButton && (
          <div className="flex space-x-3">
            <Button
              className={`${commonButtonClass} pea-button-outline flex-1`}
              variant="outline"
              onClick={onSave}
            >
              {saveText}
            </Button>
          </div>
        )}

        {/* Third Row - Cancel Button (Hidden in step 0) */}
        {showCancelButton && currentStep !== 0 && (
          <div className="flex space-x-3">
            <Button
              className={`${commonButtonClass} cancel-button flex-1`}
              variant="outline"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex justify-between items-center mt-6">
      {/* Left side buttons */}
      <div className="flex items-center space-x-3">
        <Button
          className={`${commonButtonClass} pea-button-outline`}
          variant="outline"
          onClick={onGoBack}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          {backText}
        </Button>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center space-x-3">
        {/* Cancel Button (Hidden in step 0) */}
        {showCancelButton && currentStep !== 0 && (
          <Button
            className={`${commonButtonClass} cancel-button`}
            variant="outline"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}

        {/* Save Button */}
        {showSaveButton && (
          <Button
            className={`${commonButtonClass} pea-button-outline`}
            variant="outline"
            onClick={onSave}
          >
            {saveText}
          </Button>
        )}

        {/* Main Action Button */}
        {isConfirmStep ? (
          <Button
            className={`${commonButtonClass} pea-button`}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        ) : isCompleteStep ? (
          <Button
            className={`${commonButtonClass} pea-button`}
            onClick={onComplete}
          >
            {completeText}
          </Button>
        ) : (
          <Button
            className={`${commonButtonClass} pea-button`}
            onClick={onNext}
          >
            {nextText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkOrderActionButtons;