import MuiFormControl from "@mui/material/FormControl";
import MuiInputLabel from "@mui/material/InputLabel";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import type { FormControlProps as MuiFormControlProps } from "@mui/material/FormControl";
import type { InputLabelProps as MuiInputLabelProps } from "@mui/material/InputLabel";
import type { MenuItemProps as MuiMenuItemProps } from "@mui/material/MenuItem";
import type { SelectProps as MuiSelectProps } from "@mui/material/Select";

export type FormControlProps = MuiFormControlProps;
export type InputLabelProps = MuiInputLabelProps;
export type MenuItemProps = MuiMenuItemProps;
export type SelectProps<T = unknown> = MuiSelectProps<T>;

export function FormControl(props: FormControlProps) {
  return <MuiFormControl size="small" fullWidth {...props} />;
}

export function InputLabel(props: InputLabelProps) {
  return <MuiInputLabel {...props} />;
}

export function Select<T = unknown>(props: SelectProps<T>) {
  return <MuiSelect<T> size="small" {...props} />;
}

export function MenuItem(props: MenuItemProps) {
  return <MuiMenuItem {...props} />;
}

