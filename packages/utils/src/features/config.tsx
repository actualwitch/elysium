import React, { createContext, useContext, useMemo } from "react";
import type { WithChildren } from "src";

type Config = {
  tz?: string;
};
export const initialConfig: Config = {
  tz: undefined,
} as const;

const ConfigContext = createContext({ ...initialConfig });

export const ConfigProvider: React.FC<WithChildren & { overrides: Partial<Config> }> = ({ children, overrides }) => {
  const config = useContext(ConfigContext);
  const effectiveConfig = useMemo(() => {
    return { ...config, ...overrides };
  }, [config, overrides]);
  return <ConfigContext.Provider value={effectiveConfig}>{children}</ConfigContext.Provider>;
};
