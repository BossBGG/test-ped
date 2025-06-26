'use client'
import {useBreadcrumb} from "@/app/context/BreadcrumbContext";
import {useEffect, useMemo, useState} from "react";
import NewsBreadcrumb from "@/app/(pages)/news/breadcrumb";
import EmptyNewsImg from "@/assets/images/empty_news.png"
import {NewsItem} from "@/types"
import LatestUpdateData from "@/app/components/utils/LatestUpdateData";
import ListData from "@/app/components/list/ListData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/pro-light-svg-icons";
import WOMLogo from "@/assets/images/logo_wom.png"
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {NewsDialogContent} from "@/app/(pages)/news/dialog-content";
import {newsList} from "@/app/api/NewsApi";
import {formatDateNewsRange, formatJSDate} from "@/app/helpers/DatetimeHelper";
import Image from "next/image"
import InputSearch from "@/app/components/form/InputSearch";
import FilterDialog from "@/app/components/list/FilterDialog";
import * as React from "react";
import ModalFilter from "@/app/layout/ModalFilter";
import {DateRange} from "react-day-picker";
import {addMonths} from "date-fns";
import InputDateRange from "@/app/components/form/InputDateRange";

const News = () => {
  const {setBreadcrumb} = useBreadcrumb();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState<string>('')
  const [search_filter, setSearchFilter] = useState<string>('')
  const initDate: DateRange = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  const [date, setDate] = useState<DateRange | undefined>(initDate)

  const initFilterDate = {
    from: formatJSDate(initDate.from as Date, 'yyyy-MM-dd'),
    to: formatJSDate(initDate.to as Date, 'yyyy-MM-dd'),
  }
  const [filters, setFilters] = useState(initFilterDate);

  useEffect(() => {
    setBreadcrumb(<NewsBreadcrumb/>)
  }, [setBreadcrumb]);

  const clearFilter = () => {
    setSearch('')
    setSearchFilter('')
    setDate(initDate)
    setFilters(initFilterDate)
  }

  const submitSearch = () => {
    let filter_item = {
      from: date?.from ? formatJSDate(date.from, 'yyyy-MM-dd') : '',
      to: date?.to ? formatJSDate(date.to, 'yyyy-MM-dd') : '',
    }

    setFilters(filter_item)
  }

  const tableApiData = useMemo(() => {
    return {...filters, search: search_filter}
  }, [filters, search_filter])

  return (
    <div>
      <LatestUpdateData/>

      <div className="border-1 border-[#E1D2FF] rounded-[20px] p-5"
           style={{boxShadow: '0px 4px 4px 0px #A6AFC366'}}
      >
        <div className="flex items-center">
          <InputSearch handleSearch={setSearchFilter}
                       value={search}
                       setValue={setSearch}
          />

          <FilterDialog>
            <ModalFilter title={"ตัวกรอง"}
                         clearFilter={clearFilter}
                         submitSearch={() => submitSearch()}
            >
              <InputDateRange setData={setDate} data={date}/>
            </ModalFilter>
          </FilterDialog>
        </div>

        <ListData setListData={(data) => setNews(data as NewsItem[])}
                  tableApiData={tableApiData}
                  tableApi={newsList}
        >
          <div className="mt-3">
            {
              news.length > 0 ?
                <div className="flex align-center flex-wrap w-3/3">
                  {
                    news.map((item, index) => (
                      <Dialog key={index}>
                        <DialogTrigger className="w-3/3 lg:w-1/3 p-2 cursor-pointer">
                          <div
                            className="border-1 border-[#E1D2FF] overflow-hidden rounded-[12] flex flex-col w-full h-[390]">
                            <div className="h-1/2 relative">
                              {
                                item.is_new &&
                                <div
                                  className="absolute right-5 top-0 rounded-b-[16] bg-[#FFD4D4] text-[#ED3241] px-4 py-2 text-[14px] font-semibold">
                                  ใหม่!
                                </div>
                              }
                              <Image src={WOMLogo} alt="news picture" className="object-cover w-full h-full"/>
                            </div>

                            <div className="h-1/2 p-3 flex flex-col justify-between overflow-x-hidden text-left">
                              <div>
                                <div className="text-[#160C26] font-bold mb-2">{item.title}</div>
                                <div className="text-[#4A4A4A] font-medium mb-2 text-[14px]">{item.description}</div>
                              </div>

                              <div className="ps-3 bg-[#F8F2FF] py-2 px-3 rounded-full w-fit">
                                <FontAwesomeIcon icon={faClock} size="sm" color="#45058E" className="mr-2"/>
                                <span
                                  className="text-[#45058E] text-[14px]">{formatDateNewsRange(item.publishDateStart, item.publishDateEnd)}</span>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>

                        <NewsDialogContent news={item}/>
                      </Dialog>
                    ))
                  }
                </div>

                : <div className="flex flex-col items-center justify-center py-6 px-4">
                  <Image src={EmptyNewsImg} alt="news list empty" className="mb-3"/>
                  <div className="font-bold text-[24px] text-center">ไม่มีรายการประกาศและรายการข่าว</div>
                </div>
            }
          </div>
        </ListData>
      </div>
    </div>
  )
}

export default News;
