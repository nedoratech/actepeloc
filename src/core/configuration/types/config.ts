import type { ApiProxyConfig } from "./apiProxyConfig";

export interface Config {
  apiProxy: ApiProxyConfig;
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
}
