import { useMemo, useRef } from "react";
import { defaultListCellObjProperty, type ListPageProps } from "../model/type";
import { QCELLGrid, type QCELLGridRef } from "@repo/ui/qcell";

export function ListPage(props: ListPageProps) {
  const { data } = props;
  const qcellRef = useRef<QCELLGridRef>(null);

  const listData = useMemo(() => {
    return (
      data?.items?.map((item) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        createdAt: item.createdAt,
        viewCount: item.viewCount,
      })) ?? []
    );
  }, [data]);

  const cellObjProperty = useMemo(() => {
    return {
      ...defaultListCellObjProperty,
      data: { input: listData },
    };
  }, [listData]);

  return (
    <>
      <QCELLGrid ref={qcellRef} width="100%" height="350px" objProperty={cellObjProperty} />
    </>
  );
}
