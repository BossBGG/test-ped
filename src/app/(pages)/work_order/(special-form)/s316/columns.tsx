import { ColumnDef } from "@tanstack/react-table";
import { EditableSelectCell } from "@/app/components/editor-table/EditableSelectCell";
import { EditableTextCell } from "@/app/components/editor-table/EditableTextCell";
import { Electrical } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPencil,
  faTrashCan,
} from "@fortawesome/pro-light-svg-icons";

const equipmentNameOptions = [
  {
    label: "ขนาด A",
    value: "ขนาด A",
  },
  {
    label: "ขนาด B",
    value: "ขนาด B",
  },
  {
    label: "ขนาด C",
    value: "ขนาด C",
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

export const columns: ColumnDef<Electrical>[] = [
  {
    accessorKey: "no",
    header: "ลำดับที่",
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
      accessorKey: "name",
      header: "การไฟฟ้าเจ้าของเครื่อง",
      cell: ({ row, table }) => {
        if (row.original.isUpdate) {
          return (
            <EditableTextCell
              row={row}
              column={{ id: "name" }}
              table={table}
              columnValue={row.getValue("name") || ''}
            />
          );
        } else {
          return row.getValue("name");
        }
      },
    },
  {
    accessorKey: "size",
    header: "ขนาดหม้อแปลง",
    cell: ({ row, table }) => {
      if (row.original.isUpdate) {
        return (
          <EditableSelectCell
            columnValue={row.original.name}
            row={row}
            column={{ id: "size" }}
            table={table}
            options={equipmentNameOptions}
            placeholder={"ขนาดหม้อแปลง"}
          />
        );
      } else {
        return equipmentNameOptions.filter(
          (item) => item.value === row.getValue("size")
        )[0]?.label;
      }
    },
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
          columnValue={row.original.quantity}
          numberOnly={true}
        />
      } else {
        return row.getValue('quantity')
      }
    }
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
