import {ColumnDef} from "@tanstack/react-table";
import {MaterialEquipmentObj} from "@/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPencil, faTrashCan} from "@fortawesome/pro-light-svg-icons";
import {EditableTextCell} from "@/app/components/editor-table/EditableTextCell";
import {EditableSelectCell} from "@/app/components/editor-table/EditableSelectCell";

const materialOptions = [
  {label: 'S-3H-044 - หม้อแปลง3P5000KVA(ร่วม)', value: 'S-3H-044'},
  {label: 'อุปกรณ์ไฟฟ้า A', value: 'EQ-001'},
  {label: 'อุปกรณ์ไฟฟ้า B', value: 'EQ-002'},
  {label: 'อุปกรณ์ไฟฟ้า C', value: 'EQ-003'},
];

export const getColumns = (
  selectedItems: string[], 
  onToggleSelection: (id: string) => void 
): ColumnDef<MaterialEquipmentObj>[] => {

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
      cell: ({row, table}) => {
        let pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return <div className="text-center">{(pageIndex * pageSize) + row.index + 1}</div>
      },
    },
    {
      accessorKey: "code_and_name",
      header: "รหัสวัสดุและชื่ออุปกรณ์",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableSelectCell 
            columnValue={row.original.code || ''}
            row={row}
            column={{id: 'code'}}
            table={table}
            options={materialOptions}
            placeholder={'รหัสวัสดุและชื่ออุปกรณ์'}
          />
        } else {
          const selectedOption = materialOptions.find(item => item.value === row.original.code);
          return <div className="flex flex-col">
            <div className="font-medium">{row.original.code}</div>
            <div className="text-sm text-gray-600">{row.original.name}</div>
          </div>;
        }
      }
    },
    {
      accessorKey: "quantity",
      header: "จำนวนที่เบิก",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell 
            row={row}
            column={{id: 'quantity'}}
            table={table}
            columnValue={row.original.quantity}
            numberOnly={true}
          />
        } else {
          return row.original.quantity || 0;
        }
      }
    },
    {
      accessorKey: "remaining",
      header: "จำนวนคงเหลือ",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell 
            row={row}
            column={{id: 'remaining'}}
            table={table}
            columnValue={row.getValue('remaining') || 0}
            numberOnly={true}
          />
        } else {
          return row.getValue('remaining') || 0;
        }
      }
    },
    {
      accessorKey: "unit",
      header: "หน่วย",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell 
            row={row}
            column={{id: 'unit'}}
            table={table}
            columnValue={row.original.unit || 'ชิ้น'}
          />
        } else {
          return row.original.unit || 'ชิ้น';
        }
      }
    },
    {
      accessorKey: "price",
      header: "ราคา",
      cell: ({row, table}) => {
        if (row.original.isUpdate) {
          return <EditableTextCell 
            row={row}
            column={{id: 'price'}}
            table={table}
            columnValue={row.getValue('price') || 0}
            numberOnly={true}
          />
        } else {
          const price = row.getValue('price') as number;
          return price ? `${price.toLocaleString()}` : '0';
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