import MuiSwitch from "@mui/material/Switch";
import type { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

export type ToggleSwitchProps = MuiSwitchProps;

export function ToggleSwitch(props: ToggleSwitchProps) {
  return <MuiSwitch {...props} />;
}
