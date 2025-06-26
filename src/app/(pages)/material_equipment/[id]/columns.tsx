"use client"

import {ColumnDef, Table} from "@tanstack/react-table"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPencil, faTrashCan} from "@fortawesome/pro-light-svg-icons";
import {MaterialEquipmentObj} from "@/types";
import {EditableTextCell} from "@/app/components/editor-table/EditableTextCell";
import {EditableSelectCell} from "@/app/components/editor-table/EditableSelectCell";
import {EditableSwitchCell} from "@/app/components/editor-table/EditableSwitchCell";

const deleteData = (index: number, id: number, table: any) => {
  table.options.meta?.handleRemoveRow(index, id)
}

const updateData = (index: number, isUpdate: boolean, isEdited: boolean, table: any) => {
  const is_edit = isUpdate ? true : isEdited
  table.options.meta?.handleEditRow(index, isUpdate, is_edit, table);
}

const equipmentCodeOptions = [
  {label: '1060050019', value: '1060050019'},
  {label: '1060050018', value: '1060050018'}
]
const equipmentNameOptions = [
  {label: 'METER (E) WATTHOUR 1P 5(100) A O/D BLE', value: 'METER (E) WATTHOUR 1P 5(100) A O/D BLE'},
  {label: 'METER (E) WATTHOUR 1P 1(500', value: 'METER (E) WATTHOUR 1P 1(500'}
]

export const columns: ColumnDef<MaterialEquipmentObj>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",
    cell: ({row}) => {
      return <div className="text-center">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "code",
    header: "รหัสวัสดุ",
    cell: ({row, table}) => {
      if (row.original.isUpdate) {
        return <EditableSelectCell options={equipmentCodeOptions}
                                   row={row}
                                   column={{id: 'code'}}
                                   table={table}
                                   placeholder={'ค้นหารหัสวัสดุ'}
                                   columnValue={row.original.code}
        />
      } else {
        return equipmentCodeOptions.filter((item) => item.value === row.getValue('code'))[0]?.label
      }
    }
  },
  {
    accessorKey: "name",
    header: "ชื่ออุปกรณ์",
    cell: ({row, table}) => {
      if (row.original.isUpdate) {
        return <EditableSelectCell columnValue={row.original.name}
                                   row={row}
                                   column={{id: 'name'}}
                                   table={table}
                                   options={equipmentNameOptions}
                                   placeholder={'ชื่ออุปกรณ์'}/>
      } else {
        return equipmentNameOptions.filter((item)  => item.value === row.getValue('name'))[0]?.label
      }
    }
  },
  {
    accessorKey: "quantity",
    header: "จำนวน",
    cell: ({row, table}) => {
      if (row.original.isUpdate) {
        return <EditableTextCell row={row}
                                 column={{id: 'quantity'}}
                                 table={table}
                                 columnValue={row.original.quantity}
                                 numberOnly={true}
        />
      } else {
        return row.getValue('quantity')
      }
    }
  },
  {
    accessorKey: "unit",
    header: "หน่วย"
  },
  {
    accessorKey: "isActive",
    header: "เปิด/ปิดการใช้งาน",
    cell: ({row, table}) => (
      <div className="text-center">
        <EditableSwitchCell row={{index: row.index, isUpdate: row.original.isUpdate}}
                            column={{id: 'isActive'}}
                            columnValue={row.original.isActive}
                            table={table}
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
        {
          row.original.isUpdate ?
            <button
              className="bg-[#C8F9E9] rounded-[8px] mr-2 p-2 flex items-center justify-center cursor-pointer"
              onClick={() => updateData(row.index, false, row.original.isEdited , table)}
            >
              <FontAwesomeIcon icon={faCheckCircle} size={"sm"} color="#31C48D"/>
            </button>
            :
            <button
              className="bg-[#FDE5B6] rounded-[8px] mr-2 p-2 flex items-center justify-center cursor-pointer"
              onClick={() => updateData(row.index, true, row.original.isEdited, table)}
            >
              <FontAwesomeIcon icon={faPencil} size={"sm"} color="#F9AC12"/>
            </button>
        }

        <button
          className="bg-[#FFD4D4] rounded-[8px] p-2 flex items-center justify-center cursor-pointer"
          onClick={() => deleteData(row.index, row.original.id || 0, table)}>
          <FontAwesomeIcon icon={faTrashCan} size={"sm"} color="#E02424"/>
        </button>
      </div>
    }
  },
]
