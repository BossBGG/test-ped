import Swal, {SweetAlertOptions, SweetAlertResult} from 'sweetalert2';
import swal from "sweetalert2";

const DEFAULT_CONFIG: SweetAlertOptions = {
  heightAuto: false,
  confirmButtonText: 'ตกลง',
  cancelButtonText: 'ยกเลิก',
  buttonsStyling: false,
  customClass: {
    confirmButton: 'btn btn-primary mx-2',
    cancelButton: 'btn btn-default mx-2',
  },
}

export const showProgress = (title: string = 'กำลังดำเนินการ', message: string = ''): Promise<SweetAlertResult> => {
  return Swal.fire({
    ...DEFAULT_CONFIG,
    title,
    text: message || '',
    didOpen: () => {
      Swal.showLoading(null)
    },
    allowEscapeKey: false,
    showCloseButton: false,
    allowOutsideClick: false
  })
}

export const showError = (message: string | null = null) : Promise<SweetAlertResult> => {
  return swal.fire({
    ...DEFAULT_CONFIG,
    title: '',
    text: message || 'เกิดข้อผิดพลาด',
    icon: 'error',
  })
}

export const showConfirm = (title: string, message: string = '', options: any = {}) => {
  return swal.fire({
    ...DEFAULT_CONFIG,
    title,
    text: message || '',
    showCancelButton: true,
    icon: 'warning',
    ...options,
  }).then((result: SweetAlertResult) => {
    return result.isConfirmed
  })
}

export const showSuccess = (title: string = 'ทำรายการสำเร็จ', message: string = '', options: any = {}): Promise<boolean> => {
  return swal.fire({
    ...DEFAULT_CONFIG,
    title,
    text: message,
    showCancelButton: false,
    icon: 'success',
    ...options,
  }).then((result: SweetAlertResult) => {
    return result.isConfirmed
  })
}

export const dismissAlert = () => {
  Swal.close();
}
