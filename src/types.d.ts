export interface Maintenance {
  key: string;
  value: string;
}

export interface MenuItem {
  name: string;
  href: string;
  icon?: string;
  isTitle?: boolean;
  key?: string;
}

export interface PEAProfile {
  code: string;
  prefix: string;
  first_name: string;
  last_name: string;
  job_position: string;
  affiliated: string;
  phone: string;
  email: string;
}

export interface NewsItem {
  uuid: number | null;
  title: string;
  description: string;
  content: string;
  publishDateStart: string;
  publishDateEnd: string;
  is_new: boolean;
}

export interface Pagination {
  limit: number;
  page: number;
  totalCount: number;
}

export interface Options {
  label: string;
  value: string;
  subOptions?: Options[];
  description?: string;
}

export interface MaterialEquipmentObj {
  code: string;
  uuid: string;
  id: number;
  quantity: number | string;
  size: string;
  unit: string;
  name: string;
  price?: number | string;
  isActive: boolean;
  isUpdate: boolean;
  isEdited: boolean;
}

export interface TransformerMaterialEquipmentObj {
  code: string;
  uuid: string;
  id: number;
  quantity: number | string;
  unit: string;
  name: string;
  phase: string;
  type: string;
  size: string;
  pressure: string;
  serial: string;
  price?: number | string;
  isActive: boolean;
  isUpdate: boolean;
  isEdited: boolean;
}

export type SystemLogObj = {
  id: string;
  uuid: string;
  createdAt: string;
  logType:
    | "error"
    | "info"
    | "warning"
    | "critical"
    | "debug"
    | "notice"
    | "success"
    | "caution";
  userFirstName: string;
  userLastName: string;
  detail: string;
  old_detail: string;
  ipAddress: string;
  attributeName: string;
  fromValue: string;
  toValue: string;
};

export type WorkOrderObj = {
  sheetType: sting;
  serviceType: string;
  organization: string[];
  order_no: string | number;
  request_no: string | number;
  request_sap_no: string | number;
  request_type: string;
  request_status: string;
  job_priority: string;
  payment_received_date: string;
  work_description: string;
  division: string;
  plant_code: string;
  operation_center: string;
  cost_center: string;
  customer_info: Customer;
  electrical: Electrical[];
  workers: WorkerObj[];
  insulators : Insulator[];
  transformer: Transformer[];
  meterequipment : MeterEquipment[];
};

type Customer = {
  name: string;
  tel: string;
  address: string;
  bp: string;
  ca: string;
  latitude: string;
  longitude: string;
  email: string;
};

type Electrical = {
  id: number;
  name: string;
  size?: string;
  quantity: number;
  isUpdate?: boolean;
  isEdited: boolean;
 
};

export type ElectricalEquipment = {
  id: number;
  name: string;
  quantity: number;
  isUpdate?: boolean;
  isEdited: boolean;
};

export type Transformer = {
  id: number;
  name: string;
  quantity: number;
  phase: string;
  type: string;
  size: string;
  pressure: string;
  serial: string;
  isUpdate?: boolean;
  isEdited: boolean;
};

export type Insulator = {
  id: number;
  name?: string;
  insulator_type?: string
  quantity: number;
  isUpdate?: boolean;
  isEdited: boolean;
};

export type MeterEquipment = {
  id: number;
  equipment_name: string; 
  size: string; 
  quantity: number; 
  price: number; 
  isUpdate?: boolean;
  isEdited: boolean;
};

type WorkerObj = {
  isUpdate?: boolean;
  isEdited: boolean;
  group: string;
  operation_center: string;
  id: number;
  hours: number | number;
  unit: string;
  worker_id?: string; // เพิ่ม
  worker?: string; // เพิ่ม
  event?: string; // เพิ่ม
};
