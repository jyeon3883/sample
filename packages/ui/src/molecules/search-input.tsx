import type { ChangeEvent } from "react";
import { TextField } from "../atoms";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  label = "검색",
}: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      size="small"
      fullWidth
    />
  );
}

