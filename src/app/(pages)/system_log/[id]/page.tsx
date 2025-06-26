'use client'
import {useBreadcrumb} from "@/app/context/BreadcrumbContext";
import {useEffect, useState} from "react";
import SystemLogDetailBreadcrumb from "@/app/(pages)/system_log/[id]/breadcrumb";
import {useParams} from "next/navigation";
import LatestUpdateData from "@/app/components/utils/LatestUpdateData";
import {formatJSDateTH} from "@/app/helpers/DatetimeHelper";
import {capitalizeFirstLetter} from "@/app/components/utils/stringUtils";
import {cn} from "@/lib/utils";
import {useAppSelector} from "@/app/redux/hook";
import {DataTable} from "@/app/components/list/DataTable";
import {columns} from "@/app/(pages)/system_log/[id]/columns";
import {getLogDetailById, getLogListDetailById} from "@/app/api/SystemLogApi";
import {EmpTyData} from "@/app/(pages)/system_log/empty-data";
import ListData from "@/app/components/list/ListData";
import ListDataContent from "@/app/(pages)/system_log/[id]/list-data-content";
import Badge from "@/app/components/list/Badge";
import {SystemLogObj} from "@/types";
import {showError} from "@/app/helpers/Alert";

const LogInfo = ({label, value, className}:
                 { label: string, value: string, className?: string }): React.ReactNode => {
  return (
    <div className={cn(className, 'flex justify-between')}>
      <div className="text-[#4A4A4A] w-1/2">{label} :</div>
      <div className="w-1/2 text-end">{value}</div>
    </div>
  )
}

const SystemLogDetail = () => {
  const params = useParams();
  const screenSize = useAppSelector(state => state.screen_size);
  const [data, setData] = useState<SystemLogObj[]>([])
  const [logData, setLogData] = useState<SystemLogObj>({} as SystemLogObj)

  const {setBreadcrumb} = useBreadcrumb()
  useEffect(() => {
    setBreadcrumb(<SystemLogDetailBreadcrumb id={params.id as string}/>);
    fetchSystemLogData()
  }, [setBreadcrumb]);

  const fetchSystemLogData = () => {
    getLogDetailById(params.id as string)
      .then(res => {
        if(res.data?.status_code === 200) {
          let resData = res.data?.data as SystemLogObj;
          setLogData(resData)
        }
      })
      .catch(res => {
        showError(res.message)
      })
  }


  return <div>
    <LatestUpdateData/>

    <div className="border-1 border-[#D9A6FA] bg-[#F4EEFF] p-3 rounded-[20px] mb-3">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-1/2 p-0 md:p-3 md:border-r-1 md:border-[#AAAAAA]">
          <LogInfo label="ผู้ใช้งาน" value={`${logData.userFirstName} ${logData.userLastName}`} className="mb-2"/>
          {
            screenSize === 'mobile' ?
              <div className="mb-2 w-full flex justify-between">
                <div className="text-[#4A4A4A] w-1/2">ประเภท :</div>
                <div className="w-1/2 flex justify-end">
                  <Badge label={capitalizeFirstLetter(logData.logType)} variant={logData.logType}/>
                </div>
              </div>
              : <LogInfo label="ประเภท" value={capitalizeFirstLetter(logData.logType)} className="mb-2 md:mb-0"/>
          }
        </div>
        <div className="w-full md:w-1/2 p-0 md:p-3">
          {
            screenSize === 'mobile' ?
              <div>
                <LogInfo label="วันที่รับคำร้อง" value={formatJSDateTH(new Date(logData.createdAt), 'dd MMMM yyyy')} className="mb-2"/>
                <div className="flex flex-wrap justify-between">
                  <div className="text-[#4A4A4A] w-full">รายละเอียดเหตุการณ์ :</div>
                  <div className="w-full">{logData.detail}</div>
                </div>
              </div>
              :
              <div>
                <LogInfo label="รายละเอียดเหตุการณ์" value={logData.detail} className="mb-2"/>
                <LogInfo label="วันที่" value={formatJSDateTH(new Date(logData.createdAt), 'dd MMMM yyyy')}/>
              </div>
          }
        </div>
      </div>
    </div>

    <div className="border-1 border-[#E1D2FF] rounded-[20px] p-4">
      <div className="font-semibold">รายละเอียด</div>

      <div className="p-3">
        {
          screenSize === 'desktop' ?
            <DataTable columns={columns}
                       tableApi={getLogListDetailById(params.id as string)}
                       tableApiData={{}}
                       emptyData={<EmpTyData/>}
            /> :
            <ListData setListData={(data) => setData(data as SystemLogObj[])}
                      tableApi={getLogListDetailById(params.id as string)}
                      visibleSizeSelection={true}
            >
              {
                data?.length > 0 ?
                  data.map((item, index) => (
                    <ListDataContent item={item} key={index}
                                     screenSize={screenSize}
                    />
                  ))
                  : <EmpTyData/>
              }
            </ListData>
        }
      </div>
    </div>
  </div>
}

export default SystemLogDetail;
