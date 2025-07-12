export interface ElectronAPI {
  send: (channel: string, data?: any) => void;
  receive: (channel: string, callback: (data: any) => void) => void;
  invoke:  <T = any>(channel: string, data?: any) => Promise<T>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}