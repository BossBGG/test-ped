'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateRight} from "@fortawesome/pro-light-svg-icons";
import {useState} from "react";
import {formatDateTime} from "@/app/helpers/DatetimeHelper";
import {DateTime} from "luxon";

const LatestUpdateData = ({
                            addonRightContent
                          }: {
  addonRightContent?: React.ReactNode
}) => {
  const [isConnected, setConnected] = useState<boolean>(true);
  const [timeUpdate, setTimeUpdate] = useState<DateTime>(DateTime.now());

  return (
    <div className="text-[14px] mb-5 mt-3 flex flex-wrap justify-between items-center">
      <div className="flex flex-wrap justify-between md:justify-start">
        <span
          className="text-[#4A4A4A] font-semibold mr-2 mb-2 md:mb-0">อัปเดตล่าสุดเมื่อ : {formatDateTime(timeUpdate.toFormat('yyyy-MM-dd HH:mm:ss'), 'dd MMMM yyyy, HH:mm น.')}</span>
        <div>
         <span className={`font-semibold mr-2 ${isConnected ? 'text-[#298267]' : 'text-[#ED3241]'}`}>
          {isConnected ? 'เชื่อมต่ออินเทอร์เน็ตแล้ว' : 'ไม่ได้เชื่อมต่ออินเทอร์เน็ต'}
        </span>

          <FontAwesomeIcon icon={faArrowRotateRight} size="lg" className="cursor-pointer" color="#671FAB"
                           onClick={() => {
                             setTimeUpdate(DateTime.now())
                           }}/>
        </div>
      </div>

      {addonRightContent}
    </div>
  )
}

export default LatestUpdateData;
