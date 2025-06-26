import {NewsItem} from "@/types";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/pro-light-svg-icons";
import {Button} from "@/components/ui/button";
import {formatDateNewsRange} from "@/app/helpers/DatetimeHelper";

const NewsDialogContent = ({news} : {news: NewsItem}) => {
  return (
    <DialogContent className="h-[90%] max-w-[80%] lg:max-w-[50%] flex flex-col justify-between">
      <div className="overflow-x-hidden h-[90%]">
        <DialogHeader className="border-b-4 border-b-[#D0BAE5] pb-2">
          <DialogTitle className="text-[24px]">{news.title}</DialogTitle>
          <DialogDescription>
            {news.description}
          </DialogDescription>
          <div>
            <FontAwesomeIcon icon={faClock} size="sm" color="#57595B" className="mr-2"/>
            <span className="text-[14px] text-[#57595B]">{formatDateNewsRange(news.publishDateStart, news.publishDateEnd)}</span>
          </div>
        </DialogHeader>

        <div className="my-3">
          <div dangerouslySetInnerHTML={{__html: news.content}}></div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button className="pea-button" variant="outline">ปิด</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export { NewsDialogContent }
