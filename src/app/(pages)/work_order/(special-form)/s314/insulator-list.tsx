import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import React, {useEffect, useState} from "react";
import {DataTableEditor} from "@/app/components/editor-table/DataTableEditor";
import {columns} from "@/app/(pages)/work_order/(special-form)/s314/columns";
import {useAppSelector} from "@/app/redux/hook";
import {Insulator} from "@/types";
import {ListDataEditor} from "@/app/components/editor-table/ListDataEditor";
import ListDataContent from "@/app/(pages)/work_order/(special-form)/s314/list-data-content";
import {Button} from "@/components/ui/button";
import ModalEquipments from "@/app/(pages)/work_order/(special-form)/s314/modal-equipments";
import CardCollapse from "@/app/(pages)/work_order/(special-form)/component/CardCollapse";

interface InsulatorListProps {
  data: Insulator[],
  updateData: (data: Insulator[]) => void;
}

const InsulatorList = ({
                          data,
                          updateData
                        }: InsulatorListProps) => {
  const itemInsulator = {
    id: 0,
    insulator_type: '',
    quantity: 0,
    isUpdate: true,
    isEdited: false
  } as Insulator;

  const [insulators, setInsulators] = useState<Insulator[]>(data)
  const screenSize = useAppSelector(state => state.screen_size)
  const [removeIds, setRemoveIds] = useState<number[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [updateIndex, setUpdateIndex] = React.useState(-1);

  useEffect(() => {
    if (screenSize !== 'desktop') {
      let newInsulators: Insulator[] = insulators.map((item) => {
        return {...item, isUpdate: false};
      })

      console.log('newInsulators >>> ', newInsulators)
      setInsulators(newInsulators)
    }
  }, [screenSize]);

  const onRemoveData = (id: number) => {
    setRemoveIds(old => (
      [...old, id]
    ))
  }

  const handleUpdateData = (data: Insulator[]) => {
    setInsulators(data)
    updateData(data)
  }

  return (
    <CardCollapse title={'ฉนวนครอบสายไฟฟ้า'}>
      {
        screenSize === 'desktop'
          ? <DataTableEditor columns={columns}
                             onUpdateData={handleUpdateData}
                             visibleDelete={true}
                             rowItem={itemInsulator}
                             realData={insulators}
                             LabelAddRow={screenSize === 'desktop' ? 'เพิ่มฉนวนครอบสายไฟฟ้า' : undefined}
                             onRemoveData={onRemoveData}/>
          : <ListDataEditor onUpdateData={handleUpdateData}
                            realData={insulators}
          >
            {
              (pageData: Insulator[], page, pageSize) =>
                <div>
                  <ListDataContent pageData={pageData}
                                   realData={insulators}
                                   page={page}
                                   pageSize={pageSize}
                                   onUpdateData={handleUpdateData}
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
                    เพิ่มฉนวนครอบสายไฟฟ้า
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

export default InsulatorList;