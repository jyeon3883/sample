import { Button, TextField } from "@repo/ui";
import type { ListSearchFormProps } from "./model/type";

export const ListSearchForm = (props: ListSearchFormProps) => {
  const { onSearch, filters, setFilters } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <TextField
        label="제목"
        name="title"
        value={filters.title ?? ""}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
