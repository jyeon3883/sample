import type * as React from "react";
import type { ModalSize, ModalType } from "../../atoms/Modal";

export type ModalContentProps = {
  close: (result?: unknown) => void;
};

export type OpenModalOptions<P = Record<string, never>> = {
  id?: string;
  component: React.ComponentType<P & ModalContentProps>;
  props?: P;
  title?: string;
  description?: string;
  size?: ModalSize;
  type?: ModalType;
  actions?: React.ReactNode;
  onClose?: (result?: unknown) => void;
};
