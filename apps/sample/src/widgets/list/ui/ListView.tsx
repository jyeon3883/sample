import {
  useListPosts,
  type ListPostsParams,
  type SampleTagPostListResponse,
} from "@repo/api-client";
import { Box } from "@repo/ui/atoms";
import { useState } from "react";
import { DefaultFilters } from "./model/type";
import { ListSearchForm } from "@/features/listSearchForm";
import { ListPage } from "@/features/list";

export function ListView() {
  /**
   * 검색 필터
   */
  const [filters, setFilters] = useState<ListPostsParams>({});
  const [data, setData] = useState<SampleTagPostListResponse | null>(null);

  /**
   * 게시글 목록 조회
   */
  const { mutate, isPending } = useListPosts({
    mutation: {
      onSuccess: (data) => {
        console.log(data);
        setData(data);
      },
    },
  });

  /**
   * 검색 핸들러
   */
  const handleSearch = () => {
    const params = { ...DefaultFilters, ...filters };
    mutate({ params });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ListSearchForm onSearch={handleSearch} filters={filters} setFilters={setFilters} />
      <ListPage data={data} isLoading={isPending} filters={filters} setFilters={setFilters} />
    </Box>
  );
}
