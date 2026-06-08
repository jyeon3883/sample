"use client";

import { Modal } from "../../atoms/Modal";
import type { OpenModalOptions } from "./types";

export type ModalHostProps<P = Record<string, never>> = OpenModalOptions<P> & {
  open: boolean;
  onDismiss: () => void;
  close: (result?: unknown) => void;
};

export function ModalHost<P = Record<string, never>>({
  open,
  onDismiss,
  close,
  component: Component,
  props,
  title,
  description,
  size,
  type,
  actions,
}: ModalHostProps<P>) {
  return (
    <Modal
      open={open}
      onClose={onDismiss}
      title={title}
      description={description}
      size={size}
      type={type}
      actions={actions}
    >
      <Component {...((props ?? {}) as P)} close={close} />
    </Modal>
  );
}
