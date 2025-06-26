'use client'
import {useBreadcrumb} from "@/app/context/BreadcrumbContext";
import {useEffect, useMemo, useState} from "react";
import MaterialEquipmentBreadcrumb from "@/app/(pages)/material_equipment/breadcrumb";
import LatestUpdateData from "@/app/components/utils/LatestUpdateData";
import InputSearch from "@/app/components/form/InputSearch";
import {MaterialEquipmentObj} from "@/types";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector} from "@/app/redux/hook";
import {DataTable} from "@/app/components/list/DataTable";
import {columns} from "@/app/(pages)/material_equipment/columns";
import {MaterialEquipmentList} from "@/app/api/MaterialEquipmentApi";
import * as React from "react";
import ListData from "@/app/components/list/ListData";
import ListDataContent from "@/app/(pages)/material_equipment/list-data-content";
import FilterDialog from "@/app/components/list/FilterDialog";
import FilterDialogContent from "@/app/(pages)/material_equipment/filter-dialog-content";
import {EmpTyData} from "@/app/(pages)/material_equipment/empty-data";
import Link from "next/link";

const MaterialEquipment = () => {
  const {setBreadcrumb} = useBreadcrumb();
  const screenSize = useAppSelector(state => state.screen_size)
  const [status, setStatus] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [search_filter, setSearchFilter] = useState<string>('')
  const [data, setData] = useState<MaterialEquipmentObj[]>([])

  useEffect(() => {
    setBreadcrumb(<MaterialEquipmentBreadcrumb/>)
  }, [setBreadcrumb]);

  const clearFilter = () => {
    setSearch('')
    setStatus('all')
  }

  const tableApiData = useMemo(() => {
    let items: {search: string, status?: string} = {search: search_filter}
    if(status !== 'all') {
      items.status = status
    }

    return items;
  }, [status, search_filter])

  return (
    <div>
      <LatestUpdateData/>

      <div className="border-1 border-[#E1D2FF] rounded-[20px] p-5" style={{boxShadow: '0px 4px 4px 0px #A6AFC366'}}>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-[75%] xl:w-[87%] p-2 flex items-center">
            <InputSearch handleSearch={setSearchFilter}
                         value={search}
                         setValue={setSearch}
            />

            <FilterDialog>
              <FilterDialogContent clearFilter={() => clearFilter() }
                                   status={status}
                                   submitSearch={setStatus}/>
            </FilterDialog>
          </div>

          <div className="w-full md:w-[25%] xl:w-[13%] md:mb-0 mb-3">
            <Link className="button pea-button text-nowrap flex w-full justify-center items-center"
                  href={"/material_equipment/create"}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2"/>
              สร้างกลุ่ม
            </Link>
          </div>
        </div>

        {
          screenSize === 'desktop' ?
            <DataTable columns={columns}
                       tableApi={MaterialEquipmentList}
                       tableApiData={tableApiData}
                       emptyData={<EmpTyData/>}/>
            : <ListData tableApiData={tableApiData}
                        tableApi={MaterialEquipmentList}
                        setListData={(data) => setData(data as MaterialEquipmentObj[])}
                        visibleSizeSelection={true}
            >
              {
                data?.length > 0 ?
                  data.map((item: MaterialEquipmentObj) => (
                    <ListDataContent item={item} key={item.uuid}/>
                  ))
                  :
                  <EmpTyData/>
              }
            </ListData>
        }
      </div>
    </div>
  )
}

export default MaterialEquipment;
