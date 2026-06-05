import type { ListPostsParams } from "@repo/api-client";

export type ListSearchFormProps = {
  onSearch: () => void;
  filters: ListPostsParams;
  setFilters: (filters: ListPostsParams) => void;
};
