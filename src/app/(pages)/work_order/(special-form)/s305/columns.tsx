import { ColumnDef } from "@tanstack/react-table";
import { EditableSelectCell } from "@/app/components/editor-table/EditableSelectCell";
import { EditableTextCell } from "@/app/components/editor-table/EditableTextCell";
import { Transformer } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faCheckCircle,
  faPencil,
  faTrashCan,
} from "@fortawesome/pro-light-svg-icons";

const equipmentNameOptions = [
  {
    label: "หม้อแปลง3P5000KVA(รายปี)",
    value: "Transformer 3P5000KVA(annual)",
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

export const columns: ColumnDef<Transformer>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",

    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "ยื่ห้อ",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: "name" }}
            table={table}
            columnValue={row.getValue('name') || ''}
          />
        );
      } else {
        return row.getValue("name");
      }
    },
  },
  {
    accessorKey: "phase",
    header: "เฟส",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableSelectCell
            columnValue={row.original.name}
            row={row}
            column={{ id: "phase" }}
            table={table}
            options={equipmentNameOptions}
            placeholder={"เฟส"}
          />
        );
      } else {
        return equipmentNameOptions.filter(
          (item) => item.value === row.getValue("phase")
        )[0]?.label;
      }
    },
  },
  {
    accessorKey: "type",
    header: "ประเภท",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: "type" }}
            table={table}
            columnValue={row.getValue('type') || ''}
            numberOnly={true}
          />
        );
      } else {
        return row.getValue("type");
      }
    },
  },
  {
    accessorKey: "serial",
    header: "Serial",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: "serial" }}
            table={table}
            columnValue={row.getValue("serial") || ''}
          />
        );
      } else {
        return row.getValue("serial");
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
            column={{ id: "size" }}
            table={table}
            columnValue={row.getValue("size") || ''}
          />
        );
      } else {
        return row.getValue("size");
      }
    },
  },
  {
    accessorKey: "pressure",
    header: "แรงดัน",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableTextCell
            row={row}
            column={{ id: "pressure" }}
            table={table}
            columnValue={row.getValue("pressure") || ''}
            
          />
        );
      } else {
        return row.getValue("pressure");
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
