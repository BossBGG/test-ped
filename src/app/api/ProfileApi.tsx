import api, {ApiResponse} from "@/app/api/Api";
import {PEAProfile} from "@/types";

export function getProfile():Promise<ApiResponse<PEAProfile>> {
  return api.get('/profile')
}
