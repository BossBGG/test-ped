import {ColumnDef} from "@tanstack/react-table";
import {Options, WorkerObj} from "@/types";
import {EditableSelectCell} from "@/app/components/editor-table/EditableSelectCell";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPencil, faTrashCan} from "@fortawesome/pro-light-svg-icons";
import {EditableTextCell} from "@/app/components/editor-table/EditableTextCell";

export const getColumns = (
  groupWorkerOptions: Options[],
  workerOptions: Options[],
  eventOptions: Options[]
): ColumnDef<WorkerObj>[] => {
  const deleteData = (index: number, id: number, table: any) => {
    table.options.meta?.handleRemoveRow(index, id)
  }

  const updateData = (index: number, isUpdate: boolean, isEdited: boolean, table: any) => {
    const is_edit = isUpdate ? true : isEdited
    table.options.meta?.handleEditRow(index, isUpdate, is_edit, table);
  }

  return [
    {
      accessorKey: "no",
      header: "ลำดับที่",
      cell: ({row}) => {
        return <div className="text-center">{row.index + 1}</div>
      },
    },
    {
      accessorKey: "group_worker",
      header: "กลุ่มผู้ปฏิบัติงาน",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableSelectCell columnValue={row.original.group}
                                     row={row}
                                     column={{id: 'group_worker'}}
                                     table={table}
                                     options={groupWorkerOptions}
                                     placeholder={'กลุ่มผู้ปฏิบัติงาน'}/>
        } else {
          return groupWorkerOptions.filter((item)  => item.value === row.getValue('group_worker'))[0]?.label
        }
      }
    },
    {
      accessorKey: "worker",
      header: "ผู้ปฏิบัติงาน",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableSelectCell columnValue={row.original.group}
                                     row={row}
                                     column={{id: 'worker'}}
                                     table={table}
                                     options={workerOptions}
                                     placeholder={'ผู้ปฏิบัติงาน'}/>
        } else {
          return workerOptions.filter((item)  => item.value === row.getValue('worker'))[0]?.label
        }
      }
    },
    {
      accessorKey: "operation_center",
      header: "ศูนย์งานหลัก",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell row={row}
                                   column={{id: 'operation_center'}}
                                   table={table}
                                   columnValue={row.original.operation_center}/>
        } else {
          return row.getValue('operation_center')
        }
      }
    },
    {
      accessorKey: "event",
      header: "กิจกรรม",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableSelectCell columnValue={row.original.group}
                                     row={row}
                                     column={{id: 'event'}}
                                     table={table}
                                     options={eventOptions}
                                     placeholder={'กิจกรรม'}/>
        } else {
          return workerOptions.filter((item)  => item.value === row.getValue('event'))[0]?.label
        }
      }
    },
    {
      accessorKey: "hours",
      header: "ชั่วโมง/งาน",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell row={row}
                                   column={{id: 'hours'}}
                                   table={table}
                                   columnValue={row.original.hours}
                                   numberOnly={true}/>
        } else {
          return row.getValue('hours')
        }
      }
    },
    {
      accessorKey: "unit",
      header: "หน่วย",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell row={row}
                                   column={{id: 'unit'}}
                                   table={table}
                                   columnValue={row.original.unit}/>
        } else {
          return row.getValue('unit')
        }
      }
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
}
