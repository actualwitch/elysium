import { useEffect, useMemo } from "react";
import { useState } from "react";
type Capability = "darkMode" | "reduceMotion" | "hdr";
type Capabilities = Record<Capability, boolean>;

const DEFAULT_CAPABILITIES: Capabilities = {
  darkMode: false,
  reduceMotion: false,
  hdr: false,
};



const mediaQueries: Record<Capability, string> = {
  darkMode: "(prefers-color-scheme: dark)",
  reduceMotion: "(prefers-reduced-motion)",
  hdr: "(color-gamut: p3)",
} as const;


export const useCapabilities = (overrides?: Readonly<Partial<Capabilities>>) => {
  const [caps, setCaps] = useState(() => ({ ...DEFAULT_CAPABILITIES }));
  const listeners = useMemo(() => new Map<string, (e: MediaQueryListEvent) => void>(), []);
  const matches = useMemo(() => new Map<string, MediaQueryList>(), []);
  useEffect(() => {
    const updates: Partial<Capabilities> = {};

    for (const [cap, query] of Object.entries(mediaQueries)) {
      const match = matchMedia(query);
      matches.set(cap, match);
      if (match.matches) updates[cap as Capability] = true;
      const listener = (e: MediaQueryListEvent) => void setCaps((caps) => ({ ...caps, [cap]: e.matches }));
      listeners.set(cap, listener);
    }
    return () => {
      matches.forEach((match, key) => {
        const listener = listeners.get(key);
        if (listener === undefined) return;
        listeners.delete(key);
        match.removeEventListener('change', listener);
      });
      matches.clear();
    };
  }, []);
  return useMemo(() => ({...caps, ...overrides}), [caps, overrides]);
};
