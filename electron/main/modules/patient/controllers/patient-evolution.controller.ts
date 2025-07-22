import { ipcMain } from "electron";
import { PatientEvolutionService } from "../services/patient-evolution.service";
import { Evolution } from "../models/evolution.model";
import { RequireId } from "../../utils/requiredId.type";

export function registerPatientEvolutionController() {
  ipcMain.handle('patientEvolution:getAllByPatientId', async (_, patientId: number) => {
    return await PatientEvolutionService.listEvolutionsByPatientId(patientId);
  });

  ipcMain.handle('patientEvolution:getById', async (_, id: number) => {
    return await PatientEvolutionService.getEvolutionById(id);
  });

  ipcMain.handle('patientEvolution:create', async (_, dto: Evolution) => {
    return await PatientEvolutionService.createEvolution(dto);
  });

  ipcMain.handle('patientEvolution:update', async (_, evolution: RequireId<Evolution>) => {
    await PatientEvolutionService.updateEvolution(evolution);
  });

  ipcMain.handle('patientEvolution:delete', async (_, id: number) => {
    await PatientEvolutionService.deleteEvolution(id);
  });
}
