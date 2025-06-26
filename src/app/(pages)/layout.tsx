'use client'
import "../globals.css";
import StoreProvider from "@/app/redux/provider";
import Sidebar from "@/app/layout/Sidebar";
import Header from "@/app/layout/Header";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {BreadcrumbProvider} from "@/app/context/BreadcrumbContext";
import {useEffect} from "react";
import {setScreenSize} from "@/app/redux/slices/ScreenSizeSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import HeaderMobile from "@/app/layout/HeaderMobile";

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const screenSize = useAppSelector(state => state.screen_size);
  const handleResize = () => {
    let screen_size = "desktop"
    const width = window.innerWidth;
    console.log('width >>> ', width);
    if (width <= 768) {
      screen_size = 'mobile';
    } else if (width <= 1376) {
      //1376 ipad pro horizontal
      screen_size ='tablet';
    }

    dispatch(setScreenSize(screen_size));
  };

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return (
    <StoreProvider>
      {
        screenSize === 'mobile' && <HeaderMobile/>
      }
      <BreadcrumbProvider>
        <div className="min-h-screen bg-[#F4EEFF] flex relative">
          <Sidebar/>
          <main className="flex-1 bg-[#F4EEFF] p-[14px] w-full">
            <div className="w-full h-full bg-white rounded-[40px] p-[20px]">
              <Header/>
              {children}
            </div>
          </main>
        </div>
      </BreadcrumbProvider>
    </StoreProvider>
  );
}
