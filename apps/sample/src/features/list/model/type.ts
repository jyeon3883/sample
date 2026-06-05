import type { ListPostsParams, SampleTagPostListResponse } from "@repo/api-client";

export interface ListPageProps {
  data: SampleTagPostListResponse | null;
  isLoading: boolean;
  filters: ListPostsParams;
  setFilters: (filters: ListPostsParams) => void;
}

export const defaultListCellObjProperty = {
  id: "list-sample",
  rowheaders: ["sequence"] as const,
  onechlikedit: true,
  columns: [
    { key: "id", title: ["ID"], width: "5%", type: "html" },
    { key: "title", title: ["제목"], width: "35%", type: "html" },
    { key: "author", title: ["작성자"], width: "20%", type: "html" },
    { key: "createdAt", title: ["작성일"], width: "35%", type: "html" },
    { key: "viewCount", title: ["조회수"], width: "5%", type: "html" },
  ],
  pagination: {
    pageunit: 10,
    mode: "simple",
  },
};
