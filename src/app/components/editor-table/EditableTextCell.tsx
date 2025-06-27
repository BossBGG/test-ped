'use client';
import {ChangeEvent, JSX, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";

interface EditableTextCellProps {
  columnValue: number | string;
  row: {
    index: number;
  },
  column: {
    id: string;
  },
  table: any,
  numberOnly?: boolean,
}

export const EditableTextCell = <T extends object>({
                                                     columnValue,
                                                     row: {index},
                                                     column: {id},
                                                     table,
                                                     numberOnly = false
                                                   }: EditableTextCellProps): JSX.Element => {
  const initialValue = columnValue;
  const [value, setValue] = useState(columnValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    table.options.meta?.updateData(index, id as keyof T, value);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    let v: string | number = e.target.value;
    if(numberOnly) {
      v = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : '';
    }
    setValue(v)
  }

  return (
    <Input
      type={numberOnly ? "number" : "text"}
      value={value}
      onChange={handleChangeValue}
      onBlur={handleBlur}
      className="h-[44px] bg-white"
    />
  );
};
