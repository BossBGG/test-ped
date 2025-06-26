import api, {ApiResponse} from './Api'
import {Maintenance} from "@/types";

export function checkMaintenanceModeApi(): Promise<ApiResponse<Maintenance>> {
  return api.get('/config/maintenance')
}
