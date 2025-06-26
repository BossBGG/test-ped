"use client"

import {ColumnDef} from "@tanstack/react-table"

export interface SystemLogDetailColumnProps {
  attributeName: string
  fromValue: string
  toValue: string
}

export const columns: ColumnDef<SystemLogDetailColumnProps>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",
    cell: ({row}) => {
      return <div className="text-center">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "attributeName",
    header: "ชื่อฟิลด์"
  },
  {
    accessorKey: "fromValue",
    header: "รายละเอียดเพิ่มเติม (ข้อมูลเดิม)",
    cell: ({row}) => {
      return row.getValue('fromValue') || '-'
    }
  },
  {
    accessorKey: "toValue",
    header: "รายละเอียดเพิ่มเติม (ข้อมูลใหม่)",
    cell: ({row}) => {
      return row.getValue('toValue') || '-'
    }
  }
]
