'use client';
import InputSelect from "@/app/components/form/InputSelect";
import {useEffect, useState} from "react";
import {Options} from "@/types";

interface EditableSelectCellProps {
  columnValue: string;
  row: {
    index: number;
  },
  column: {
    id: string;
  },
  table: any,
  options: Options[],
  placeholder: string,
}

export const EditableSelectCell = <T extends object>({
                                                       columnValue,
                                                       row,
                                                       column,
                                                       table,
                                                       options,
                                                       placeholder,
                                                     }: EditableSelectCellProps ) => {
  const initialValue = columnValue;
  const [value, setValue] = useState(initialValue);

  function handleChange(value: string) {
    setValue(value);
    table.options.meta?.updateData(row.index, column.id as keyof T, value);
  }

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <InputSelect options={options}
                 value={value}
                 placeholder={placeholder}
                 setData={handleChange}
    />
  );
};
