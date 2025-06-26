'use client';
import {useBreadcrumb} from "@/app/context/BreadcrumbContext";
import {faBell, faListUl, faUser} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faSortDown} from "@fortawesome/pro-solid-svg-icons";
import WOMLogo from "@/assets/images/logo_wom.png"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

const Header = () => {
  const {breadcrumb} = useBreadcrumb();
  const router = useRouter();
  const defaultClassMenuItem = 'px-14 py-3 cursor-pointer mb-3'

  const handleMenu = (menu: string) => {
    router.push(menu);
  }

  const logout = () => {

  }

  return (
    <header className="pb-[12px]">
      <div className="p-2 flex items-center justify-between w-full flex-wrap">
        <div className="w-full md:w-1/2">{breadcrumb}</div>

        <div className="flex items-center justify-end w-1/2 md:relative absolute md:top-0 md:right-0 -top-[4rem] right-[1.5rem]">
          <div className="bg-[#E1D2FF] px-4 py-3 rounded-full relative mr-3 cursor-pointer">
            <FontAwesomeIcon icon={faCircle} className="absolute right-0 top-0" color="#FF3700" size="sm"/>
            <FontAwesomeIcon icon={faBell} size="lg" color="#671FAB"/>
          </div>

          <div className="hidden md:flex flex-col items-end justify-center mr-3">
            <div className="text-[#160C26] font-semibold mb-1">นางสาว พิมพ์ลักษ์ บุญชูกุศล</div>
            <div className="flex items-center">
              <div className="mr-2"><FontAwesomeIcon icon={faUser} size="sm" color="#160C26" className="font-semibold"/>
              </div>
              <div className="text-[#160C26] mr-2 font-semibold">505388</div>
              <div className="bg-[#9538EA] text-white rounded-[8] px-2 py-1">
                XSCX
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center cursor-pointer">
                <div className="w-[48] h-[48] border-2 border-[#E0E0E0] rounded-full overflow-hidden">
                  <img src={WOMLogo.src} alt="image profile" className="w-full h-full object-cover"/>
                </div>

                <div className="ms-2">
                  <FontAwesomeIcon icon={faSortDown}/>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3" sideOffset={18} alignOffset={-155} align="start">
              <DropdownMenuItem className={defaultClassMenuItem} onClick={() => handleMenu('/')}>
                <FontAwesomeIcon icon={faListUl}/> งานของฉัน
              </DropdownMenuItem>
              <DropdownMenuItem className={defaultClassMenuItem} onClick={() => handleMenu('/profile')}>
                <FontAwesomeIcon icon={faUser}/> โปรไฟล์
              </DropdownMenuItem>
              <DropdownMenuItem className={cn(defaultClassMenuItem, "border-1 border-[#671FAB] rounded-full")}
                                onClick={() => logout()}>
                <div className="text-[#671FAB] hover:text-[#671FAB]">ออกจากระบบ</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <hr className="h-[4px] border-[#D0BAE5]"/>
    </header>
  )
}

export default Header;
