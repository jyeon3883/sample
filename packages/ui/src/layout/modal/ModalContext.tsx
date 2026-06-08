"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ModalHost } from "./ModalHost";
import type { OpenModalOptions } from "./types";

type ModalEntry = {
  id: string;
  options: OpenModalOptions;
};

type ModalContextValue = {
  openModal: <P = Record<string, never>>(options: OpenModalOptions<P>) => string;
  closeModal: (id?: string, result?: unknown) => void;
  closeAllModals: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

let modalIdCounter = 0;

function createModalId(customId?: string) {
  return customId ?? `modal-${++modalIdCounter}`;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<ModalEntry[]>([]);
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  const removeEntry = useCallback((id: string, result?: unknown) => {
    const entry = entriesRef.current.find((e) => e.id === id);
    entry?.options.onClose?.(result);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const closeModal = useCallback(
    (id?: string, result?: unknown) => {
      if (id) {
        removeEntry(id, result);
        return;
      }

      const stack = entriesRef.current;
      const top = stack[stack.length - 1];
      if (top) {
        removeEntry(top.id, result);
      }
    },
    [removeEntry]
  );

  const openModal = useCallback(<P,>(options: OpenModalOptions<P>) => {
    const id = createModalId(options.id);

    setEntries((prev) => {
      const withoutSameId = prev.filter((entry) => entry.id !== id);
      return [...withoutSameId, { id, options: options as OpenModalOptions }];
    });

    return id;
  }, []);

  const closeAllModals = useCallback(() => {
    const stack = [...entriesRef.current];
    stack.reverse().forEach((entry) => {
      entry.options.onClose?.();
    });
    setEntries([]);
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
    }),
    [openModal, closeModal, closeAllModals]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {entries.map((entry) => (
        <ModalHost
          key={entry.id}
          open
          onDismiss={() => closeModal(entry.id)}
          close={(result) => closeModal(entry.id, result)}
          {...entry.options}
        />
      ))}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used inside ModalProvider");
  }
  return ctx;
}
