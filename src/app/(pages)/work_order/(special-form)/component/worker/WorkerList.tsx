import CardCollapse from "@/app/(pages)/work_order/(special-form)/component/CardCollapse";
import {useAppSelector} from "@/app/redux/hook";
import {DataTableEditor} from "@/app/components/editor-table/DataTableEditor";
import {getColumns} from "@/app/(pages)/work_order/(special-form)/component/worker/columns";
import {Options, WorkerObj} from "@/types";
import {useState} from "react";
import InputDateButton from "@/app/components/form/InputDateButton";

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
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  
  const itemWorker: WorkerObj = {
    isUpdate: true,
  } as WorkerObj

  const handleDateChange = (date: Date | undefined) => {
    setAppointmentDate(date);
    console.log('Appointment date selected:', date);
  };

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
        <div className="p-4">
          <div className="flex flex-col space-y-4">
            <InputDateButton
              label="วันที่นัดหมายปฏิบัติงาน"
              value={appointmentDate}
              onChange={handleDateChange}
              placeholder="เลือกวันที่นัดหมายปฏิบัติงาน"
              className="w-full md:w-1/3"
            />
            
            {appointmentDate && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  วันที่ที่เลือก: <span className="font-medium">{appointmentDate.toLocaleDateString('th-TH')}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </CardCollapse>
    </div>
  )
}

export default WorkerList;