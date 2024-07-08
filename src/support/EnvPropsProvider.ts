import { DefaultTimeouts } from '../types/types.config';
import dotenv from 'dotenv';
export class EnvPropsProvider {
  private static dotenvInitialized = false;
  private static initDotenv() {
    if (!this.dotenvInitialized) {
      dotenv.config();
      this.dotenvInitialized = true;
    }
  }
  static getDefaultTimeouts(): DefaultTimeouts {
    return {
      _1sec: Number(this.getEnvProp('TIMEOUT_SMALLEST')),
      _5sec: Number(this.getEnvProp('TIMEOUT_SMALL')),
      _15sec: Number(this.getEnvProp('TIMEOUT_MEDIUM')),
      _50sec: Number(this.getEnvProp('TIMEOUT_LARGE')),
      _95sec: Number(this.getEnvProp('TIMEOUT_MAX')),
    };
  }
  static getEnvProp = (key: string): string => {
    this.initDotenv();
    const value = process.env[key];
    if (!value) {
      throw Error(`No environment variable found for ${key}`);
    }
    return value;
  };
}
