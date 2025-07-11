import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import React, {useEffect, useState} from "react";
import {DataTableEditor} from "@/app/components/editor-table/DataTableEditor";
import {columns} from "@/app/(pages)/work_order/(special-form)/s312/columns";
import {useAppSelector} from "@/app/redux/hook";
import {ElectricalEquipment} from "@/types";
import {ListDataEditor} from "@/app/components/editor-table/ListDataEditor";
import ListDataContent from "@/app/(pages)/work_order/(special-form)/s312/list-data-content";
import {Button} from "@/components/ui/button";
import ModalEquipments from "@/app/(pages)/work_order/(special-form)/s312/modal-equipments";
import CardCollapse from "@/app/(pages)/work_order/(special-form)/component/CardCollapse";

interface TypeElectricalListProps {
  data: ElectricalEquipment[],
  updateData: (data: ElectricalEquipment[]) => void;
}

const TypeElectricalList = ({
                          data,
                          updateData
                        }: TypeElectricalListProps) => {
  const itemElectricalEquipment = {
    id: 0,
    name: '',
    quantity: 0,
    isUpdate: true,
    isEdited: false
  } as ElectricalEquipment;

  const [electricalEquipments, setElectricalEquipments] = useState<ElectricalEquipment[]>(data)
  const screenSize = useAppSelector(state => state.screen_size)
  const [removeIds, setRemoveIds] = useState<number[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [updateIndex, setUpdateIndex] = React.useState(-1);

  const electricalTypeOptions = [
    {label: 'มิเตอร์ไฟฟ้า', value: 'มิเตอร์ไฟฟ้า'},
    {label: 'อุปกรณ์ประกอบในระบบวัดพลังงานไฟฟ้าและอื่นๆ', value: 'อุปกรณ์ประกอบในระบบวัดพลังงานไฟฟ้าและอื่นๆ'},
    {label: 'อุปกรณ์ประกอบในระบบควบคุมหรือป้องกัน', value: 'อุปกรณ์ประกอบในระบบควบคุมหรือป้องกัน'},
    {label: 'หม้อแปลงไฟฟ้า', value: 'หม้อแปลงไฟฟ้า'},
    {label: 'อุปกรณ์สวิตซ์เกียร์', value: 'อุปกรณ์สวิตซ์เกียร์'},
    {label: 'อุปกรณ์ป้องกันฟ้าผ่า', value: 'อุปกรณ์ป้องกันฟ้าผ่า'},
    {label: 'อุปกรณ์อื่นๆ', value: 'อุปกรณ์อื่นๆ'}
  ]

  useEffect(() => {
    if (screenSize !== 'desktop') {
      let newElectricalEquipments: ElectricalEquipment[] = electricalEquipments.map((item) => {
        return {...item, isUpdate: false};
      })

      console.log('newElectricalEquipments >>> ', newElectricalEquipments)
      setElectricalEquipments(newElectricalEquipments)
    }
  }, [screenSize]);

  const onRemoveData = (id: number) => {
    setRemoveIds(old => (
      [...old, id]
    ))
  }

  const handleUpdateData = (data: ElectricalEquipment[]) => {
    setElectricalEquipments(data)
    updateData(data)
  }

  return (
    <CardCollapse title={'ประเภทอุปกรณ์ไฟฟ้า'}>
      {
        screenSize === 'desktop'
          ? <DataTableEditor columns={columns}
                             onUpdateData={handleUpdateData}
                             visibleDelete={true}
                             rowItem={itemElectricalEquipment}
                             realData={electricalEquipments}
                             LabelAddRow={screenSize === 'desktop' ? 'เพิ่มประเภทอุปกรณ์ไฟฟ้า' : undefined}
                             onRemoveData={onRemoveData}/>
          : <ListDataEditor onUpdateData={handleUpdateData}
                            realData={electricalEquipments}
          >
            {
              (pageData: ElectricalEquipment[], page, pageSize) =>
                <div>
                  <ListDataContent pageData={pageData}
                                   realData={electricalEquipments}
                                   page={page}
                                   pageSize={pageSize}
                                   onUpdateData={handleUpdateData}
                                   equipmentNameOptions={electricalTypeOptions}
                                   onRemoveData={onRemoveData}
                                   setUpdateIndex={(index) => {
                                     setUpdateIndex(index)
                                     setOpenModal(true)
                                   }}
                  />

                  <Button className="pea-button-outline my-2 w-full"
                          onClick={() => setOpenModal(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                    เพิ่มประเภทอุปกรณ์ไฟฟ้า
                  </Button>
                </div>
            }
          </ListDataEditor>
      }

      <ModalEquipments open={openModal}
                       onClose={() => setOpenModal(false)}
                       index={updateIndex}
      />
    </CardCollapse>
  )
}

export default TypeElectricalList;