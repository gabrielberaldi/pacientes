import { app } from 'electron';
import { BrowserWindow } from 'electron';
import { createWindow } from './window';
import { createTables } from './infra/database/migrations/create-tables';
import { registerUserController } from './modules/user/controllers/user.controller';

app.whenReady().then(() => {
  createTables();
  registerUserController();
  createWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) createWindow();
  });
  
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
