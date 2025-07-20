import { ipcMain } from 'electron';
import { PatientRegisterDto } from '../models/patient-register-dto.model';
import { PatientService } from '../services/patient.service';
import { RequireId } from '../../utils/requiredId.type';

export function registerPatientController() {
  ipcMain.handle('patient:getAll', async () => {
    return await PatientService.listAllPatients();
  });

  ipcMain.handle('patient:getById', async (_, id: number) => {
    return await PatientService.getPatientById(id);
  });

  ipcMain.handle('patient:create', async (_, patientDto: PatientRegisterDto) => {
    return await PatientService.createPatient(patientDto);
  });

  ipcMain.handle('patient:update', async (_, patient: RequireId<PatientRegisterDto>) => {
    await PatientService.updatePatient(patient);
  });

  ipcMain.handle('patient:delete', async (_, id: number) => {
    await PatientService.deletePatient(id);
  });
}