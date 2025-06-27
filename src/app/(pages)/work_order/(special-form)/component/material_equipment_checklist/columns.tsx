
import {ColumnDef} from "@tanstack/react-table";
import {MaterialEquipmentObj} from "@/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import Badge from "@/app/components/list/Badge";

export const getColumns = (
  selectedItems: string[], // รายการ ID ที่ถูกเลือก
  onToggleSelection: (id: string) => void // ฟังก์ชันสำหรับจัดการการเลือก/ยกเลิกการเลือก
): ColumnDef<MaterialEquipmentObj>[] => {

  return [
    {
      accessorKey: "no",
      header: "ลำดับที่",
      cell: ({row, table}) => {
        let pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return <div className="text-center">{(pageIndex * pageSize) + row.index + 1}</div>
      },
    },
    {
      accessorKey: "name",
      header: "รายละเอียด",
      cell: ({row}) => {
        return <div>{row.getValue('name')}</div>
      }
    },
    {
      accessorKey: "status",
      header: "สถานะ",
      cell: ({row}) => {
        const status = row.getValue('isActive') ? 'active' : 'inactive'
        const status_label = status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'
        return (
          <Badge 
            variant={status} 
            label={status_label}
          />
        )
      }
    },
    {
      accessorKey: "action",
      header: "เลือก",
      enableSorting: false,
      cell: ({row}) => {
        const isSelected = selectedItems.includes(row.original.uuid as string);
        
        return (
          <div className="flex justify-center">
            <button
              onClick={() => onToggleSelection(row.original.uuid as string)}
              className={`p-2 rounded-full transition-colors ${
                isSelected 
                  ? 'text-green-600 bg-green-100 hover:bg-green-200' 
                  : 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-600'
              }`}
              title={isSelected ? 'ยกเลิกการเลือก' : 'เลือกรายการนี้'}
            >
              <FontAwesomeIcon 
                icon={faCheckCircle} 
                className={`text-lg ${isSelected ? 'text-green-600' : 'text-gray-400'}`}
              />
            </button>
          </div>
        )
      }
    },
  ]
}