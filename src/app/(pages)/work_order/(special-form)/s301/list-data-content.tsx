import {Electrical, Options} from "@/types";
import {Card, CardContent} from "@/components/ui/card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPencil, faTrashCan} from "@fortawesome/pro-light-svg-icons";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "@/app/redux/hook";

interface ListDataContentProps {
  realData: Electrical[],
  pageData: Electrical[],
  onUpdateData: (data: Electrical[]) => void,
  onRemoveData: (id: number) => void,
  setUpdateIndex: (index: number) => void,
  page: number,
  pageSize: number,
  equipmentNameOptions: Options[]
}

const ListDataContent = ({
                           realData,
                           pageData,
                           onUpdateData,
                           onRemoveData,
                           setUpdateIndex,
                           page,
                           pageSize,
                           equipmentNameOptions,
                         }: ListDataContentProps) => {
  const [data, setData] = useState<Electrical[]>([]);

  useEffect(() => {
    setData(pageData)
  }, [pageData]);

  const handleUpdateData = (key: string, value: string | number | boolean | undefined, index: number) => {
    index = (page * pageSize) + index
    const newData = realData.map((item: Electrical, idx) => {
      let isEdited = item.isEdited;
      if(key === 'isUpdate' && value) {
        isEdited = true
        setUpdateIndex(index)
        value = false
      }

      if(key === 'isActive') {
        isEdited = true
      }

      return idx === index ? {...item, [key]: value, isEdited} : item;
    })
    onUpdateData(newData);
  }

  const deleteData = (id:number, index: number) => {
    const newData = realData.filter((_, idx) => index !== idx);
    onUpdateData(newData);
    id && onRemoveData(id);
  }

  return (
    <div>
      {
        pageData.length > 0
          ?
          pageData.map((item, index) => (
            <Card key={index} className="p-3 mb-3 shadow-none">
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div>{index + 1}. {item.name}</div>
                    <div>จำนวนหน่วย : {item.quantity}</div>
                  </div>

                  <div className="flex justify-end items-center md:mt-0 mt-3">
                    {
                      item.isUpdate ?
                        <button
                          className="bg-[#C8F9E9] rounded-[8px] mr-2 p-2 flex items-center justify-center cursor-pointer"
                          onClick={() => handleUpdateData('isUpdate', false, index)}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} size={"sm"} color="#31C48D"/>
                        </button>
                        :
                        <button
                          className="bg-[#FDE5B6] rounded-[8px] mr-2 w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
                          onClick={() => handleUpdateData('isUpdate', true, index)}
                        >
                          <FontAwesomeIcon icon={faPencil} size={"sm"} color="#F9AC12"/>
                        </button>
                    }

                    <button
                      className="bg-[#FFD4D4] rounded-[8px] p-2 flex items-center justify-center cursor-pointer"
                      onClick={() => deleteData(item.id || 0, index)}>
                      <FontAwesomeIcon icon={faTrashCan} size={"sm"} color="#E02424"/>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
          : <div className="text-center text-gray p-4">ไม่มีรายการวัสดุอุปกรณ์</div>
      }
    </div>
  )
}

export default ListDataContent;
