import { RequireId } from "../../utils/requiredId.type";
import { Evolution } from "../models/evolution.model";
import { PatientEvolutionRepository } from "../repositories/patient-evolution.repository";

export class PatientEvolutionService {
  static async syncEvolutions(patientId: number, evolucoes: Evolution[]): Promise<void> {
    const currentEvolutions = await PatientEvolutionRepository.getAllByPatientId(patientId);
    const receivedIds = evolucoes.filter(e => e.id).map(e => e.id!);
    const toDelete = currentEvolutions.filter(e => !receivedIds.includes(e.id as number));
    await Promise.all(toDelete.map(evo => PatientEvolutionRepository.delete(evo.id as number)));
    await Promise.all(evolucoes.map(evo => {
      evo.date = new Date(evo.date).toISOString().split('T')[0];
      if (evo.id) {
        return PatientEvolutionRepository.update(evo as RequireId<Evolution>);
      } else {
        return PatientEvolutionRepository.create({ patientId, date: evo.date, text: evo.text });
      }
    }));
  }
}