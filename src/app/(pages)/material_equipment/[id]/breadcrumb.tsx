import Breadcrumb from "@/app/layout/Breadcrumb";

const AddMaterialEquipmentBreadcrumb = () => {
  const items = [
    {label: 'จัดการกลุ่มวัสดุและอุปกรณ์', href: '/material_equipment'},
    {label: 'สร้างกลุ่ม', href: '/material_equipment/create'},
  ]

  return <Breadcrumb items={items}
                     title={'สร้างกลุ่มวัสดุและอุปกรณ์'}
                     goBackUrl={"/material_equipment"}/>
}

export default AddMaterialEquipmentBreadcrumb;
