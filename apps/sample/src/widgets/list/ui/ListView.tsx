import { ListSearchForm } from "@/features/listSearchForm/ui/ListSearchForm";
import { useListPosts, type ListPostsParams } from "@repo/api-client";
import { Box } from "@repo/ui/atoms";
import { useState } from "react";
import { DefaultFilters } from "./model/type";

export function ListView() {
  /**
   * 검색 필터
   */
  const [filters, setFilters] = useState<ListPostsParams>({});

  /**
   * 게시글 목록 조회
   */
  const { mutate, isPending } = useListPosts({
    mutation: {
      onSuccess: (data) => {
        console.log(data);
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
    <Box>
      <ListSearchForm onSearch={handleSearch} filters={filters} setFilters={setFilters} />
    </Box>
  );
}
