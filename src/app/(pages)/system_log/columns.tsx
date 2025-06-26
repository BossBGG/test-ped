"use client"

import {ColumnDef} from "@tanstack/react-table"
import {formatJSDateTH} from "@/app/helpers/DatetimeHelper";
import WOMLogo from "@/assets/images/logo_wom.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "@/app/components/utils/stringUtils";
import Link from "next/link";
import {SystemLogObj} from "@/types";

export const columns: ColumnDef<SystemLogObj>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",
    cell: ({row}) => {
      return <div className="text-center">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "วันที่",
    cell: ({row}) => {
      return <div>
        <div className="mb-1">{formatJSDateTH(new Date(row.getValue('createdAt')), 'dd MMMM yyyy')}</div>
        <div className="text-[#4A4A4A] text-[12px]">{formatJSDateTH(new Date(row.getValue('createdAt')), 'HH:mm น.')}</div>
      </div>
    },
  },
  {
    accessorKey: "logType",
    header: "ประเภท",
    cell: ({row}) => {
      const value: string = row.getValue('logType')
      return capitalizeFirstLetter(value)
    }
  },
  {
    accessorKey: "userFirstName",
    header: "ผู้ใช้งาน",
    cell: ({row}) => {
      return <div className="flex">
        <div className="w-[24px] h-[24px] border-1 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={WOMLogo.src} alt="profile image"/>
        </div>
        <div className="ms-2">{row.getValue('userFirstName')} {row.original.userLastName}</div>
      </div>
    }
  },
  {
    accessorKey: "detail",
    header: "รายละเอียดเหตุการณ์",
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
  },
  {
    accessorKey: "action",
    header: "",
    enableSorting: false,
    cell: ({row}) => {
      return <Link className="bg-[#BEE2FF] rounded-[8px] p-2 flex items-center justify-center"
                  href={`/system_log/${row.original.uuid}`}>
        <FontAwesomeIcon icon={faSearch} color="#03A9F4"/>
      </Link>
    }
  },
]
