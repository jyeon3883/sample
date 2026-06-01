import MuiInput from "@mui/material/Input";
import MuiTextField from "@mui/material/TextField";
import type { InputProps as MuiInputProps } from "@mui/material/Input";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

export type InputProps = MuiInputProps;
export type TextFieldProps = MuiTextFieldProps;

export function Input(props: InputProps) {
  return <MuiInput fullWidth {...props} />;
}

export function TextField(props: TextFieldProps) {
  return <MuiTextField size="small" fullWidth {...props} />;
}

