import CardCollapse from "@/app/(pages)/work_order/(special-form)/component/CardCollapse";
import {useAppSelector} from "@/app/redux/hook";
import {DataTableEditor} from "@/app/components/editor-table/DataTableEditor";
import {getColumns} from "@/app/(pages)/work_order/(special-form)/component/worker/columns";
import {Options, WorkerObj} from "@/types";
import {useState} from "react";

interface WorkerListProps {
  data: WorkerObj[]
}

const WorkerList = ({
                      data
                    }: WorkerListProps) => {
  const screenSize = useAppSelector(state => state.screen_size);
  const [groupWorkerOptions, setGroupWorkerOptions] = useState<Options[]>([]);
  const [workerOptions, setWorkerOptions] = useState<Options[]>([]);
  const [eventOptions, setEventOptions] = useState<Options[]>([]);
  const itemWorker: WorkerObj = {
    isUpdate: true,
  } as WorkerObj

  return (
    <div>
      <CardCollapse title={'รายชื่อผู้ปฏิบัติงาน'}>
        {
          screenSize === 'desktop' &&
          <DataTableEditor columns={getColumns(groupWorkerOptions, workerOptions, eventOptions)}
                           onUpdateData={() => {}}
                           realData={data}
                           onRemoveData={() => {}}
                           LabelAddRow={'เพิ่มผู้ปฏิบัติงาน'}
                           rowItem={itemWorker}
          />
        }
      </CardCollapse>

      <CardCollapse title={'วันที่นัดหมายปฏิบัติงาน'}>
        <div></div>
      </CardCollapse>
    </div>
  )
}

export default WorkerList;
