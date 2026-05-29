export const queryKeys = {
  health: {
    all: ["health"] as const,
    check: () => [...queryKeys.health.all, "check"] as const,
  },
} as const;
