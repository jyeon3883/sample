import type { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem, Select } from "../atoms";

export type LabeledSelectOption = {
  label: string;
  value: string;
};

export type LabeledSelectProps = {
  label: string;
  value: string;
  options: LabeledSelectOption[];
  onChange: (value: string) => void;
};

export function LabeledSelect({ label, value, options, onChange }: LabeledSelectProps) {
  const labelId = `select-label-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<string> labelId={labelId} label={label} value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

