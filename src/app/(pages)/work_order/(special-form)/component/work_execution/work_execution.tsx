/* work_execution.tsx */
import React, { useEffect, useRef } from "react";
import CardCollapse from "../CardCollapse";
import OutputButton from "@/app/components/form/OutputButton";
import { useAppSelector } from "@/app/redux/hook";
import { MapPin, Navigation } from "lucide-react";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const WorkExecution = () => {
  const screenSize = useAppSelector((state) => state.screen_size);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const latitude = 18.74499;
  const longitude = 99.126769;

  useEffect(() => {
    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  const initializeMap = () => {
    if (mapRef.current && window.google) {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };

      mapInstance.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add marker
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: mapInstance.current,
        title: "Current Location",
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#DC2626" stroke="white" stroke-width="4"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });
    }
  };

  const handleLocationCheck = () => {
    // Handle location check/edit functionality
    console.log("Check/Edit location clicked");
  };

  return (
    <div>
      <div className="">
        <CardCollapse title={"ผลการปฏิบัติงาน"}>
          <div className="p-4 flex flex-row justify-center">
            {/* Top row - Coordinates */}
            <div className="flex flex-col ">
              <div className="">
                <OutputButton label="Latitude" value={latitude.toString()} />
              </div>
              <div>
                <OutputButton label="Longitude" value={longitude.toString()} />
              </div>
            </div>

            {/* Second row - Date/Time */}
            <div className="flex flex-col ">
              <div>
                <input 
                type="data" 
                className=""
                />
              </div>
              <div>
                <input 
                type="data" 
                />
              </div>
            </div>

            {/* Map Container */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Map Header */}
              <div className="flex flex-col items-start  p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">แผนที่ / พิกัด</span>
                </div>
                <button 
                  onClick={handleLocationCheck}
                  className="flex items-center gap-2 px-4 py-2 mt-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <Navigation className="w-4 h-4" />
                  ตรวจสอบ/แก้ไขตำแหน่ง
              </button>
              </div>

              

              {/* Map Content */}
              <div className="relative">
                <div 
                  ref={mapRef}
                  className="w-full h-80"
                  style={{ minHeight: '320px' }}
                >
                  {/* Fallback content while map loads */}
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                      <p className="text-gray-600">Loading Map...</p>
                    </div>
                  </div>
                </div>

                {/* Coordinates Display Overlay */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1 font-medium">Current Location</div>
                  <div className="text-sm font-mono text-gray-800 font-medium">
                    {latitude}, {longitude}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardCollapse>
      </div>
    </div>
  );
};

export default WorkExecution;