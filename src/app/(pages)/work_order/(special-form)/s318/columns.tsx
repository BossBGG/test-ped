import { ColumnDef } from "@tanstack/react-table";
import { EditableSelectCell } from "@/app/components/editor-table/EditableSelectCell";
import { EditableTextCell } from "@/app/components/editor-table/EditableTextCell";
import { MeterEquipment } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPencil,
  faTrashCan,
} from "@fortawesome/pro-light-svg-icons";

const equipmentNameOptions = [
  {
    label: "มิเตอร์",
    value: "มิเตอร์",
  },
  {
    label: "อุปกรณ์ครอบสายไฟฟ้า",
    value: "อุปกรณ์ครอบสายไฟฟ้า",
  },
  {
    label: "หม้อแปลงไฟฟ้า",
    value: "หม้อแปลงไฟฟ้า",
  },
  
];

const deleteData = (index: number, id: number, table: any) => {
  table.options.meta?.handleRemoveRow(index, id);
};

const updateData = (
  index: number,
  isUpdate: boolean,
  isEdited: boolean,
  table: any
) => {
  const is_edit = isUpdate ? true : isEdited;
  table.options.meta?.handleEditRow(index, isUpdate, is_edit, table);
};

export const columns: ColumnDef<MeterEquipment>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "equipment_name",
    header: "มิเตอร์/อุปกรณ์ไฟฟ้า",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableSelectCell
            columnValue={row.getValue('equipment_name') || ''}
            row={row}
            column={{ id: 'equipment_name' }}
            table={table}
            options={equipmentNameOptions}
            placeholder={'เลือกมิเตอร์/อุปกรณ์ไฟฟ้า'}
          />
        );
      } else {
        return row.getValue('equipment_name') || '';
      }
    },
  },
  {
    accessorKey: "size",
    header: "ขนาด",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: 'size' }}
            table={table}
            columnValue={row.getValue('size') || ''}
          />
        );
      } else {
        return row.getValue('size') || '';
      }
    },
  },
  {
    accessorKey: "quantity",
    header: "จำนวน",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: 'quantity' }}
            table={table}
            columnValue={row.getValue('quantity') || 0}
            numberOnly={true}
          />
        );
      } else {
        return row.getValue('quantity') || 0;
      }
    },
  },
  {
    accessorKey: "price",
    header: "ราคา",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: 'price' }}
            table={table}
            columnValue={row.getValue('price') || 0}
            numberOnly={true}
          />
        );
      } else {
        const price = row.getValue('price') as number;
        return price ? `${price.toLocaleString()}` : '0';
      }
    },
  },
  {
    accessorKey: "action",
    header: "",
    enableSorting: false,
    cell: ({ row, table }) => {
      return (
        <div className="flex justify-center">
          {row.original.isUpdate ? (
            <button
              className="bg-[#C8F9E9] rounded-[8px] mr-2 p-2 flex items-center justify-center cursor-pointer"
              onClick={() =>
                updateData(row.index, false, row.original.isEdited, table)
              }
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                size={"sm"}
                color="#31C48D"
              />
            </button>
          ) : (
            <button
              className="bg-[#FDE5B6] rounded-[8px] mr-2 p-2 flex items-center justify-center cursor-pointer"
              onClick={() =>
                updateData(row.index, true, row.original.isEdited, table)
              }
            >
              <FontAwesomeIcon icon={faPencil} size={"sm"} color="#F9AC12" />
            </button>
          )}

          <button
            className="bg-[#FFD4D4] rounded-[8px] p-2 flex items-center justify-center cursor-pointer"
            onClick={() => deleteData(row.index, row.original.id || 0, table)}
          >
            <FontAwesomeIcon icon={faTrashCan} size={"sm"} color="#E02424" />
          </button>
        </div>
      );
    },
  },
];