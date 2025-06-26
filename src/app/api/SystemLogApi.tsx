import {createTableListApi} from "@/app/api/TableApiHelper";
import api, {ApiResponse} from "@/app/api/Api";
import {SystemLogObj} from "@/types";

const path = 'v1/system-logs'
export const systemLogList = createTableListApi(`/${path}?systemType=WOM`, api)

export const getLogDetailById = (id: string): Promise<ApiResponse<SystemLogObj>> => {
  return api.get(`/${path}/${id}?systemType=WOM`)
}

export const getLogListDetailById = (id: string) => createTableListApi(`/${path}/${id}/details`, api)
