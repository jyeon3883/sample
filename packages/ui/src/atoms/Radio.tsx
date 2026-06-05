import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup from "@mui/material/RadioGroup";
import type { RadioProps as MuiRadioProps } from "@mui/material/Radio";
import type { RadioGroupProps as MuiRadioGroupProps } from "@mui/material/RadioGroup";

export type RadioProps = MuiRadioProps;
export type RadioGroupProps = MuiRadioGroupProps;

export function Radio(props: RadioProps) {
  return <MuiRadio {...props} />;
}

export function RadioGroup(props: RadioGroupProps) {
  return <MuiRadioGroup {...props} />;
}
