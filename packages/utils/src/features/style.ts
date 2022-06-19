

export const p =
  <T extends string>(k: T) =>
  <V extends Partial<Record<T, boolean>>>(p: V) =>
    p[k as keyof V] ? "&" : "";