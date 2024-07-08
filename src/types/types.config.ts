export type GlobalVariables = { [key: string]: string };
export type SupportedRegions = 'US' | 'CAN';
export type SupportedUserTypes = 'Admin' | 'Sales';
export type SupportedEnvs = QAEnv;
export type QAEnv = 'QA';
export interface DefaultTimeouts {
  _1sec: number;
  _5sec: number;
  _15sec: number;
  _50sec: number;
  _95sec: number;
}
