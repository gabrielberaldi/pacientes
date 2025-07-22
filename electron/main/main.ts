import { app } from 'electron';
import { BrowserWindow } from 'electron';
import { createWindow } from './window';
import { createTables } from './infra/database/migrations/create-tables';
import { registerUserController } from './modules/user/controllers/user.controller';
import { registerAuthController } from './modules/auth/controllers/auth.controller';
import { registerPatientController } from './modules/patient/controllers/patient.controller';
import { registerPatientEvolutionController } from './modules/patient/controllers/patient-evolution.controller';

app.whenReady().then(() => {
  createTables();
  registerUserController();
  registerAuthController();
  registerPatientController();
  registerPatientEvolutionController();
  createWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) createWindow();
  });
  
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
