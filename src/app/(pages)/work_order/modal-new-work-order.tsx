import Modal from "@/app/layout/Modal";
import {Button} from "@/components/ui/button";
import InputRadio from "@/app/components/form/InputRadio";
import {Options, WorkOrderObj} from "@/types";
import {useEffect, useState} from "react";
import InputSelect from "@/app/components/form/InputSelect";
import InputCheckbox from "@/app/components/form/InputCheckbox";
import {useRouter} from "next/navigation";
import {dismissAlert, showProgress} from "@/app/helpers/Alert";

interface ModalNewWorkOrderProps {
  open: boolean,
  onClose: () => void,
}

const FooterModal = ({
                       cancel,
                       submit
                     }:
                     {
                       cancel: () => void,
                       submit: () => void,
                     }) => (
  <div className="w-full flex flex-wrap justify-between items-center">
    <div className="p-2 w-1/2">
      <Button
        className="text-[#671FAB] w-full bg-white border-1 border-[#671FAB] rounded-full font-semibold md:text-start text-center cursor-pointer hover:bg-white"
        onClick={() => cancel()}
      >
        ยกเลิก
      </Button>
    </div>
    <div className="p-2 w-1/2">
      <Button className="pea-button w-full" onClick={() => submit()}>
        สร้างใบสั่งงาน
      </Button>
    </div>
  </div>
)

const ModalNewWorkOrder = ({
                             open,
                             onClose
                           }: ModalNewWorkOrderProps) => {
  const router = useRouter()

  const workOrderTypeOptions: Options[] = [
    {label: 'ใบสั่งงาน', value: 'once_order', description: 'สร้างใบสั่งงานแบบใบเดียว'},
    {label: 'ใบสั่งงานเป็นชุด', value: 'group_order', description: 'สร้างใบสั่งงานแบบหลายใบ'},
  ]

  const serviceTypeOptions: Options[] = [
    {label: 'Y3-2 บริการจัดหาและให้เช่าอุปกรณ์ไฟฟ้า', value: '1'},
    {label: 'Y3-3 บริการอื่นๆ', value: '2'},
    {
      label: 'Y3-4 บริการทดสอบและสอบเทียบอุปกรณ์ไฟฟ้า', value: '3',
      subOptions: [
        {label: 'S301 ขอซ่อมแซมอุปกรณ์ไฟฟ้า', value: '3_1'},
        {label: 'S302 ขอตรวจสอบและบำรุงรักษาสวิตซ์เกียร์', value: '3_2'},
        {label: 'S303 ขอตรวจสอบและบำรุงรักษาเคเบิล', value: '3_3'},
      ]
    },
    {
      label: 'Y3-6 บริการตรวจสอบและบำรุงรักษาระบบไฟฟ้า', value: '4',
      subOptions: [
        {label: 'S301 ขอซ่อมแซมอุปกรณ์ไฟฟ้า', value: '4_1'},
        {label: 'S302 ขอตรวจสอบและบำรุงรักษาสวิตซ์เกียร์', value: '4_2'},
        {label: 'S303 ขอตรวจสอบและบำรุงรักษาเคเบิล', value: '4_3'},
      ]
    },
  ]

  const organizationTypeOptions: Options[] = [
    {
      label: 'กฟน.1 เชียงใหม่', value: '1',
      subOptions: [
        {label: 'กฟจ. เชียงใหม่', value: '1_1'},
        {
          label: 'กฟจ. ลำพูน', value: '1_2',
          subOptions: [
            {label: 'กฟส. เมืองลำพูน', value: '1_2_1'},
            {label: 'กฟส. บ้านโฮ่ง', value: '1_2_2'},
            {label: 'กฟส. แม่ตืน', value: '1_2_3'},
            {label: 'กฟส. แม่ทา', value: '1_2_4'},
            {label: 'กฟส. เวียงหนองล่อง', value: '1_2_5'},
            {label: 'กฟส.บ้านธิ', value: '1_2_6'},
            {label: 'กฟส. ป่าซาง', value: '1_2_7'},
            {label: 'กฟส. ลี้', value: '1_2_8'},
            {label: 'กฟส. นครเจดีย์', value: '1_2_9'},
            {label: 'กฟส. ทุ่งหัวช้าง', value: '1_2_10'},
          ]
        }
      ]
    },
    {label: 'กฟน.2 พิษณุโลก', value: '2'},
    {label: 'กฟน.3 ลพบุรี', value: '3'}
  ]

  const [data, setData] = useState<WorkOrderObj>({} as WorkOrderObj)

  const submit = () => {
    showProgress()
    router.push("/work_order/s301")
    setTimeout(() => {
      dismissAlert()
    }, 500)
  }

  useEffect(() => {
    if (!data.sheetType) {
      data.sheetType = workOrderTypeOptions[0].value;
    }
  }, [data.sheetType])

  const handleUpdateData = (key: string, value: string | string[]) => {
    console.log('value >>> ', value)
    console.log('key >>> ', key)
    setData(prevState => ({...prevState, [key]: value}));
  }

  return (
    <Modal title={'สร้างใบงาน'}
           open={open}
           onClose={onClose}
           footer={<FooterModal cancel={onClose} submit={() => submit()}/>}
    >
      <InputRadio label="เลือกประเภทการสร้างใบงาน"
                  options={workOrderTypeOptions}
                  value={data.sheetType}
                  setData={(v: string) => handleUpdateData('sheetType', v)}
                  classItem="rounded-[12px] p-3 w-full border-1"
                  classItemChecked="border-1 border-[#671FAB]"
                  classLabel="flex flex-col items-start"
                  className="flex"
      />

      {
        data.sheetType === workOrderTypeOptions[1].value &&
        <InputCheckbox options={organizationTypeOptions}
                       label="เลือกหน่วยงาน"
                       setData={(v: string[]) => handleUpdateData('organization', v)}
                       value={data.organization || []}
        />
      }

      <InputSelect options={serviceTypeOptions}
                   value={data.serviceType}
                   placeholder="เลือกประเภทงานบริการ"
                   setData={(v: string) => handleUpdateData('serviceType', v)}
                   label="ประเภทงานบริการ"
      />
    </Modal>
  )
}

export default ModalNewWorkOrder;
