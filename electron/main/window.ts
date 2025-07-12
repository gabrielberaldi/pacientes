import { join } from 'path';
import { app, BrowserWindow, screen } from 'electron';

let mainWindow: BrowserWindow | null = null;

export function createWindow(): void {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width, //Default: 800
    height, //Default: 600
    autoHideMenuBar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: join(__dirname, '../preload/preload.js'),
    },
  });

  // mainWindow.loadFile(join(app.getAppPath(), 'dist/browser/index.html'));
  mainWindow.loadFile(join(__dirname, '../../dist/browser/index.html'));
  mainWindow.on('closed', () => mainWindow = null);
}