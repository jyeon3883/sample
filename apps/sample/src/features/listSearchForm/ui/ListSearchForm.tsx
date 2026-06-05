import { Button, TextField } from "@repo/ui";
import type { ListSearchFormProps } from "./model/type";
import { Box, Stack } from "@repo/ui/atoms";

export const ListSearchForm = (props: ListSearchFormProps) => {
  const { onSearch, filters, setFilters } = props;
  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            label="제목"
            name="title"
            value={filters.title ?? ""}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <Button type="submit">Search</Button>
        </Stack>
      </form>
    </Box>
  );
};
