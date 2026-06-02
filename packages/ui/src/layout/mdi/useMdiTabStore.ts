import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export interface MdiTabMeta {
  id: string;
  label: string;
}

export interface MdiTabStoreState {
  tabsMeta: MdiTabMeta[];
  activeId: string | null;
  /** LRU 순서: 앞(index 0) = 가장 오래된, 뒤(마지막) = 가장 최근 */
  mountedIds: string[];
  tabStates: Record<string, unknown>;

  addTabMeta: (meta: MdiTabMeta) => void;
  removeTabMeta: (id: string) => void;
  setActiveId: (id: string | null) => void;
  activateMounted: (id: string) => void;
  removeMounted: (id: string) => void;
  setTabState: (tabId: string, state: unknown) => void;
  removeTabState: (tabId: string) => void;
}

export type MdiTabStore = ReturnType<typeof createMdiTabStore>;

export function createMdiTabStore(storageKey: string) {
  return createStore<MdiTabStoreState>()(
    persist(
      (set) => ({
        tabsMeta: [],
        activeId: null,
        mountedIds: [],
        tabStates: {},

        addTabMeta: (meta) =>
          set((s) => {
            if (s.tabsMeta.some((t) => t.id === meta.id)) return s;
            return { tabsMeta: [...s.tabsMeta, meta] };
          }),

        removeTabMeta: (id) =>
          set((s) => ({
            tabsMeta: s.tabsMeta.filter((t) => t.id !== id),
          })),

        setActiveId: (id) => set({ activeId: id }),

        /** 활성 탭만 마운트: mountedIds를 [id] 단독으로 교체 */
        activateMounted: (id) => set({ mountedIds: [id] }),

        removeMounted: (id) =>
          set((s) => ({
            mountedIds: s.mountedIds.filter((mid) => mid !== id),
          })),

        setTabState: (tabId, state) =>
          set((s) => ({
            tabStates: { ...s.tabStates, [tabId]: state },
          })),

        removeTabState: (tabId) =>
          set((s) => {
            const next = { ...s.tabStates };
            delete next[tabId];
            return { tabStates: next };
          }),
      }),
      {
        name: storageKey,
        skipHydration: true,
        partialize: (s) => ({
          tabsMeta: s.tabsMeta,
          activeId: s.activeId,
          mountedIds: s.mountedIds,
          tabStates: s.tabStates,
        }),
      },
    ),
  );
}
