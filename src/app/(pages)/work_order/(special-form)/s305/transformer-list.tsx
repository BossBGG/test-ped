import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import React, {useEffect, useState} from "react";
import {DataTableEditor} from "@/app/components/editor-table/DataTableEditor";
import {columns} from "@/app/(pages)/work_order/(special-form)/s305/columns";
import {useAppSelector} from "@/app/redux/hook";
import {Transformer} from "@/types";
import {ListDataEditor} from "@/app/components/editor-table/ListDataEditor";
import ListDataContent from "@/app/(pages)/work_order/(special-form)/s305/list-data-content";
import {Button} from "@/components/ui/button";
import ModalEquipments from "@/app/(pages)/work_order/(special-form)/s305/modal-equipments";
import CardCollapse from "@/app/(pages)/work_order/(special-form)/component/CardCollapse";

interface TransformerListProps {
  data: Transformer [],
  updateData: (data: Transformer []) => void;
}

const TransformerList = ({
                          data,
                          updateData
                        }: TransformerListProps) => {
  const itemTransformer = {
    id: 0,
    name: '',
    quantity: 0,
    isUpdate: true,
    isEdited: false
  } as Transformer ;

  const [transformers, setTransformers] = useState<Transformer []>(data)
  const screenSize = useAppSelector(state => state.screen_size)
  const [removeIds, setRemoveIds] = useState<number[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [updateIndex, setUpdateIndex] = React.useState(-1);

  const transformerNameOptions = [
    {label: 'หม้อแปลง3P5000KVA(รายปี)', value: 'หม้อแปลง3P5000KVA(รายปี)'},
  
  ]

  useEffect(() => {
    if (screenSize !== 'desktop') {
      let newTransformers: Transformer [] = transformers.map((item) => {
        return {...item, isUpdate: false};
      })

      console.log('newTransformers >>> ', newTransformers)
      setTransformers(newTransformers)
    }
  }, [screenSize]);

  const onRemoveData = (id: number) => {
    setRemoveIds(old => (
      [...old, id]
    ))
  }

  const handleUpdateData = (data: Transformer []) => {
    setTransformers(data)
    updateData(data)
  }

  return (
    <CardCollapse title={'รายละเอียดหม้อแปลง'}>
      {
        screenSize === 'desktop'
          ? <DataTableEditor columns={columns}
                             onUpdateData={handleUpdateData}
                             visibleDelete={true}
                             rowItem={itemTransformer}
                             realData={transformers}
                             LabelAddRow={screenSize === 'desktop' ? 'เพิ่มหม้อแปลง' : undefined}
                             onRemoveData={onRemoveData}/>
          : <ListDataEditor onUpdateData={handleUpdateData}
                            realData={transformers}
          >
            {
              (pageData: Transformer [], page, pageSize) =>
                <div>
                  <ListDataContent pageData={pageData}
                                   realData={transformers}
                                   page={page}
                                   pageSize={pageSize}
                                   onUpdateData={handleUpdateData}
                                   equipmentNameOptions={transformerNameOptions}
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
                    เพิ่มหม้อแปลง
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

export default TransformerList;