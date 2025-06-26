"use client"

import {ColumnDef} from "@tanstack/react-table"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrashCan} from "@fortawesome/pro-light-svg-icons";
import Badge from "@/app/components/list/Badge";
import Link from "next/link";
import {Switch} from "@/components/ui/switch";
import {MaterialEquipmentObj} from "@/types";
import {showConfirm, showError, showProgress, showSuccess} from "@/app/helpers/Alert";
import {deleteMaterialEquipment, updateActiveStatusMaterial} from "@/app/api/MaterialEquipmentApi";

export const deleteData = (id: string, table?: any) => {
  showConfirm('ต้องการลบกลุ่มวัสดุและอุปกรณ์นี้ใช่หรือไม่ ?').then(isConfirmed => {
    if(isConfirmed) {
      deleteMaterialEquipment(id).then((res) => {
        if(res.status == 204) {
          showSuccess().then(res => {
            if(table) {
              table.options?.meta?.refreshData()
            }
          })
        }else {
          showError(res.data?.message || '')
        }
      })
    }
  })
}

export const handleActive = (id: string, isActive: boolean, table?: any) => {
  showConfirm(`ต้องการ${isActive ? 'เปิด' : 'ปิด'} การใช้งานกลุ่มวัสดุอุปกรณ์นี้ใช่หรือไม่ ?`).then(isConfirmed => {
    if(isConfirmed) {
      showProgress()
      updateActiveStatusMaterial(id, isActive).then(res => {
        if(res.status == 200) {
          showSuccess().then(res => {
            if(table) {
              table.options?.meta?.refreshData()
            }
          })
        }else {
          showError(res.data?.message || '')
        }
      })
    }
  })
}

export const columns: ColumnDef<MaterialEquipmentObj>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",
    cell: ({row,table}) => {
      let pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return <div className="text-center">{(pageIndex * pageSize) + row.index + 1}</div>
    },
  },
  {
    accessorKey: "name",
    header: "รายละเอียด"
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({row}) => {
      const status = row.getValue('isActive') ? 'active' : 'inactive'
      const status_label = status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'
      return (
        <Badge label={status_label} variant={status}/>
      )
    }
  },
  {
    accessorKey: "isActive",
    header: "เปิด/ปิดการใช้งาน",
    cell: ({row, table}) => (
      <div className="text-center">
        <Switch checked={row.getValue('isActive')}
                onCheckedChange={() => handleActive(row.original.uuid as string, !row.getValue('isActive'), table)}
                className="data-[state=checked]:bg-[#9538EA] data-[state=unchecked]:bg-[#57595B] cursor-pointer"
        />
      </div>
    )
  },
  {
    accessorKey: "action",
    header: "",
    enableSorting: false,
    cell: ({row, table}) => {
      return <div className="flex justify-center">
        <Link className="bg-[#FDE5B6] rounded-[8px] mr-2 p-2 flex items-center justify-center cursor-pointer"
             href={`/material_equipment/${row.original.uuid}`}
        >
          <FontAwesomeIcon icon={faPencil} size={"sm"} color="#F9AC12"/>
        </Link>
        <button className="bg-[#FFD4D4] rounded-[8px] p-2 flex items-center justify-center cursor-pointer"
             onClick={() => deleteData(row.original.uuid as string, table)}>
          <FontAwesomeIcon icon={faTrashCan} size={"sm"} color="#E02424"/>
        </button>
      </div>
    }
  },
]
