import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/pro-light-svg-icons";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
  onLocationUpdate?: (lat: number, lng: number) => void;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, onLocationUpdate }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Load Google Maps API (แทนที่ YOUR_API_KEY ด้วย API Key จริง)
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=geometry`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  const initializeMap = () => {
    if (mapRef.current) {
      // ใช้ OpenStreetMap แทน Google Maps สำหรับ demo
      // หรือสามารถใช้ Google Maps ได้ถ้ามี API Key
      createSimpleMap();
    }
  };

  const createSimpleMap = () => {
    if (mapRef.current) {
      // สร้าง simple map display
      mapRef.current.innerHTML = `
        <div style="width: 100%; height: 100%; background: #e8f5e8; position: relative; border-radius: 8px; overflow: hidden;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #dc2626; font-size: 24px;">
            📍
          </div>
          <div style="position: absolute; bottom: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 8px; border-radius: 4px; font-size: 12px;">
            ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
          </div>
          <div style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 10px;">
            แผนที่
          </div>
        </div>
      `;
    }
  };

  const handleLocationCheck = () => {
    // จำลองการอัพเดทตำแหน่ง
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          onLocationUpdate?.(newLat, newLng);
        },
        (error) => {
          console.error('Error getting location:', error);
          // ใช้ตำแหน่งปัจจุบันแทน
          onLocationUpdate?.(latitude, longitude);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      onLocationUpdate?.(latitude, longitude);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
      {/* Map Header */}
      <div className="flex flex-col items-start p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          
          <span className="text-gray-700 font-medium">แผนที่ / พิกัด</span>
        </div>
        <button 
          onClick={handleLocationCheck}
          className="flex items-center gap-2 px-4 py-2 bg-[#671FAB] text-white rounded-md hover:bg-[#5A1A96] transition-colors text-sm font-medium"
        >
          <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
          ตรวจสอบ/แก้ไขตำแหน่ง
        </button>
      </div>

      {/* Map Content */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="w-full h-64"
          style={{ minHeight: '256px' }}
        >
          {/* Fallback content while map loads */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#671FAB] mx-auto mb-2"></div>
              <p className="text-gray-600">กำลังโหลดแผนที่...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;