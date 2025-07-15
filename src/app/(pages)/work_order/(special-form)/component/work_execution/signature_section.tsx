import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRotateLeft } from "@fortawesome/pro-light-svg-icons";
import { useAppSelector } from "@/app/redux/hook";

interface SignatureSectionProps {
  title: string;
  signature: string;
  onSignatureChange: (signature: string) => void;
  showPresetSignature?: boolean; // เปิด/ปิดการแสดงปุ่ม "ใช้ลายเซ็นที่ตั้งไว้"
  showResetButton?: boolean; // เปิด/ปิดการแสดงปุ่ม "รีเซ็ต"
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  title,
  signature,
  onSignatureChange,
  showPresetSignature = false,
  showResetButton = false
}) => {
  const [showSignature, setShowSignature] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenSize = useAppSelector(state => state.screen_size);

  // Initialize canvas
  useEffect(() => {
    if (showSignature && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [showSignature]);

  const handleSignatureClick = () => {
    setShowSignature(true);
  };

  const handleSignatureComplete = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      onSignatureChange(dataURL);
    }
    setShowSignature(false);
  };

  const handleResetSignature = () => {
    onSignatureChange('');
  };

  const handleUsePresetSignature = () => {
    // จำลองลายเซ็นที่ตั้งไว้
    const presetSignature = 'preset_signature_data_url';
    onSignatureChange(presetSignature);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Mouse events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    if (ctx) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    if (!canvasRef.current) return;
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  // Touch events for mobile
  const startTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent as any);
  };

  const touchDraw = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent as any);
  };

  const stopTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  // Mobile layout
  if (screenSize === 'mobile') {
    return (
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700">
            {title}
          </Label>
          {signature && showResetButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSignature}
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="mr-1" />
              รีเซ็ต
            </Button>
          )}
        </div>

        {/* Mobile signature canvas with preset options */}
        <div className="relative">
          {/* Preset signature buttons */}
          {showPresetSignature && !signature && (
            <div className="mb-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleUsePresetSignature}
                  className="flex items-center justify-center p-3 border-2 border-purple-300 bg-purple-50 rounded-lg text-purple-700 font-medium"
                >
                  <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                  ใช้ลายเซ็นที่ตั้งไว้
                </button>
                <button
                  onClick={handleSignatureClick}
                  className="flex items-center justify-center p-3 border-2 border-gray-300 bg-white rounded-lg text-gray-700 font-medium"
                >
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full mr-2"></div>
                  เซ็นใหม่
                </button>
              </div>
            </div>
          )}

          {/* Signature canvas/display */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg h-40 w-full flex items-center justify-center bg-gray-50 cursor-pointer relative"
            onClick={!signature ? handleSignatureClick : undefined}
          >
            {signature ? (
              <div className="relative w-full h-full">
                {signature.startsWith('data:image') ? (
                  <img src={signature} alt="Signature" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center flex items-center justify-center h-full">
                    <div>
                      <div className="text-xl font-signature text-gray-700 mb-2">✓</div>
                      <p className="text-xs text-gray-500">ลายเซ็นอิเล็กทรอนิกส์</p>
                    </div>
                  </div>
                )}
                {/* Reset button  */}
                {showResetButton && (
                  <button
                    onClick={handleResetSignature}
                    className="absolute bottom-2 right-2 text-purple-600 underline text-sm bg-white px-2 py-1 rounded"
                  >
                    รีเซ็ต
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <FontAwesomeIcon icon={faPen} className="text-xl mb-2" />
                <p className="text-sm">แตะเพื่อเซ็นชื่อ</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Signature Modal for mobile */}
        {showSignature && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4 text-center">ลายเซ็นอิเล็กทรอนิกส์</h3>
                <div className="border rounded-lg mb-4 bg-gray-50 relative">
                  <canvas
                    ref={canvasRef}
                    width="350"
                    height="200"
                    className="w-full h-48 touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startTouchDrawing}
                    onTouchMove={touchDraw}
                    onTouchEnd={stopTouchDrawing}
                    style={{ touchAction: 'none' }}
                  />
                  <button
                    onClick={clearCanvas}
                    className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs"
                  >
                    ลบ
                  </button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSignature(false)}
                    className="flex-1"
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    onClick={handleSignatureComplete}
                    className="bg-[#671FAB] hover:bg-[#5A1A96] flex-1"
                  >
                    ยืนยันลายเซ็น
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout (original with enhancements)
  return (
    <div className="flex flex-col items-center space-y-3 border-2 p-4 rounded-lg w-[45%]">
      <div className="flex items-center justify-between mb-3 w-full">
        <Label className="w-full bg-[#671FAB] text-white px-4 py-2 rounded-md text-sm text-center justify-center">
          {title}
        </Label>
      </div>
      
      {/* Preset signature buttons for desktop */}
      {showPresetSignature && !signature && (
        <div className="w-full mb-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleUsePresetSignature}
              className="flex items-center justify-center p-2 border-2 border-purple-300 bg-purple-50 rounded-lg text-purple-700 text-sm font-medium"
            >
              <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
              ใช้ลายเซ็นที่ตั้งไว้
            </button>
            <button
              onClick={handleSignatureClick}
              className="flex items-center justify-center p-2 border-2 border-gray-300 bg-white rounded-lg text-gray-700 text-sm font-medium"
            >
              <div className="w-3 h-3 border-2 border-gray-400 rounded-full mr-2"></div>
              เซ็นใหม่
            </button>
          </div>
        </div>
      )}

      {/* Signature Canvas/Display */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg h-full w-full flex items-center justify-center bg-gray-50 relative cursor-pointer"
        onClick={!signature ? handleSignatureClick : undefined}
      >
        {signature ? (
          <div className="relative w-full h-full">
            {signature.startsWith('data:image') ? (
              <img src={signature} alt="Signature" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center flex items-center justify-center h-full">
                <div>
                  <div className="text-2xl font-signature text-gray-700 mb-2">✓</div>
                  <p className="text-xs text-gray-500">ลายเซ็นอิเล็กทรอนิกส์</p>
                </div>
              </div>
            )}
            {showResetButton && (
              <button
                onClick={handleResetSignature}
                className="absolute bottom-2 right-2 text-purple-600 underline text-sm bg-white px-2 py-1 rounded"
              >
                รีเซ็ต
              </button>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <FontAwesomeIcon icon={faPen} className="text-2xl mb-2" />
            <p className="text-sm">คลิกเพื่อเซ็นชื่อ</p>
          </div>
        )}
      </div>

      {/* Enhanced Signature Modal for desktop */}
      {showSignature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">ลายเซ็นอิเล็กทรอนิกส์</h3>
            <div className="border rounded-lg mb-4 bg-gray-50 relative">
              <canvas
                ref={canvasRef}
                width="400"
                height="200"
                className="w-full h-40"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <button
                onClick={clearCanvas}
                className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs"
              >
                ลบ
              </button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSignature(false)}
              >
                ยกเลิก
              </Button>
              <Button
                onClick={handleSignatureComplete}
                className="bg-[#671FAB] hover:bg-[#5A1A96]"
              >
                ยืนยันลายเซ็น
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignatureSection;