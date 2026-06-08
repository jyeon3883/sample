"use client";

import * as React from "react";
import { ModalHost } from "./ModalHost";
import type { OpenModalOptions } from "./types";

type UseLocalModalOptions<P = Record<string, never>> = Omit<OpenModalOptions<P>, "id">;

export function useLocalModal<P = Record<string, never>>(options: UseLocalModalOptions<P>) {
  const [open, setOpen] = React.useState(false);
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  const close = React.useCallback((result?: unknown) => {
    setOpen(false);
    optionsRef.current.onClose?.(result);
  }, []);

  const openModal = React.useCallback(() => {
    setOpen(true);
  }, []);

  const ModalHostComponent = React.useMemo(() => {
    function LocalModalHost() {
      const { component, props, title, description, size, type, actions } = optionsRef.current;

      return (
        <ModalHost
          open={open}
          onDismiss={() => close()}
          close={close}
          component={component}
          props={props}
          title={title}
          description={description}
          size={size}
          type={type}
          actions={actions}
        />
      );
    }

    LocalModalHost.displayName = "LocalModalHost";
    return LocalModalHost;
  }, [open, close]);

  return {
    open,
    openModal,
    close,
    ModalHost: ModalHostComponent,
  };
}
