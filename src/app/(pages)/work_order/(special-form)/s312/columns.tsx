import {ColumnDef} from "@tanstack/react-table";
import {EditableSelectCell} from "@/app/components/editor-table/EditableSelectCell";
import {EditableTextCell} from "@/app/components/editor-table/EditableTextCell";
import {Electrical} from "@/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPencil, faTrashCan} from "@fortawesome/pro-light-svg-icons";

const electricalTypeOptions = [
  {label: 'มิเตอร์ไฟฟ้า', value: 'มิเตอร์ไฟฟ้า'},
  {label: 'อุปกรณ์ประกอบในระบบวัดพลังงานไฟฟ้าและอื่นๆ', value: 'อุปกรณ์ประกอบในระบบวัดพลังงานไฟฟ้าและอื่นๆ'},
  {label: 'อุปกรณ์ประกอบในระบบควบคุมหรือป้องกัน', value: 'อุปกรณ์ประกอบในระบบควบคุมหรือป้องกัน'},
  {label: 'หม้อแปลงไฟฟ้า', value: 'หม้อแปลงไฟฟ้า'},
  {label: 'อุปกรณ์สวิตซ์เกียร์', value: 'อุปกรณ์สวิตซ์เกียร์'},
  {label: 'อุปกรณ์ป้องกันฟ้าผ่า', value: 'อุปกรณ์ป้องกันฟ้าผ่า'},
  {label: 'อุปกรณ์อื่นๆ', value: 'อุปกรณ์อื่นๆ'}
]

const deleteData = (index: number, id: number, table: any) => {
  table.options.meta?.handleRemoveRow(index, id)
}

const updateData = (index: number, isUpdate: boolean, isEdited: boolean, table: any) => {
  const is_edit = isUpdate ? true : isEdited
  table.options.meta?.handleEditRow(index, isUpdate, is_edit, table);
}

export const columns: ColumnDef<Electrical>[] = [
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
    header: "ประเภท",
    cell: ({row, table}) => {
      if (row.original.isUpdate) {
        return <EditableSelectCell 
          columnValue={row.original.name || ''}
          row={row}
          column={{id: 'name'}}
          table={table}
          options={electricalTypeOptions}
          placeholder={'เลือกประเภทอุปกรณ์ไฟฟ้า'}
        />
      } else {
        const selectedType = electricalTypeOptions.find(item => item.value === row.getValue('name'));
        return <div className="text-left">
          {selectedType?.label || row.getValue('name')}
        </div>
      }
    }
  },
  {
    accessorKey: "quantity",
    header: "จำนวน",
    cell: ({row, table}) => {
      if (row.original.isUpdate) {
        return <EditableTextCell 
          row={row}
          column={{id: 'quantity'}}
          table={table}
          columnValue={row.original.quantity || 0}
          numberOnly={true}
        />
      } else {
        return <div className="text-center">{row.getValue('quantity') || 0}</div>
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