import MuiCheckbox from "@mui/material/Checkbox";
import MuiRadio from "@mui/material/Radio";
import MuiSwitch from "@mui/material/Switch";
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import type { RadioProps as MuiRadioProps } from "@mui/material/Radio";
import type { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

export type CheckboxProps = MuiCheckboxProps;
export type RadioProps = MuiRadioProps;
export type SwitchProps = MuiSwitchProps;

export function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox {...props} />;
}

export function Radio(props: RadioProps) {
  return <MuiRadio {...props} />;
}

export function Switch(props: SwitchProps) {
  return <MuiSwitch {...props} />;
}

