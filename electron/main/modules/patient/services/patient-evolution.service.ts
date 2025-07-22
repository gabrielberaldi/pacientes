import { RequireId } from "../../utils/requiredId.type";
import { Evolution } from "../models/evolution.model";
import { PatientEvolutionRepository } from "../repositories/patient-evolution.repository";

export class PatientEvolutionService {

  static async listEvolutionsByPatientId(patientId: number): Promise<Evolution[]> {
    return await PatientEvolutionRepository.getAllByPatientId(patientId);
  }

  static async getEvolutionById(id: number): Promise<Evolution> {
    const evolution = await PatientEvolutionRepository.getById(id);
    if (!evolution) throw new Error(`Evolução com id ${id} não encontrada`);
    return evolution;
  }

  static async createEvolution(dto: Evolution): Promise<Evolution> {
    const id = await PatientEvolutionRepository.create(dto);
    const evolution = await PatientEvolutionRepository.getById(id);
    if (!evolution) throw new Error('Erro ao buscar evolução após criação');
    return evolution;
  }

  static async updateEvolution(evolution: RequireId<Evolution>): Promise<void> {
    const existing = await PatientEvolutionRepository.getById(evolution.id);
    if (!existing) throw new Error(`Evolução com id ${evolution.id} não encontrada`);
    await PatientEvolutionRepository.update(evolution);
  }

  static async deleteEvolution(id: number): Promise<void> {
    const existing = await PatientEvolutionRepository.getById(id);
    if (!existing) throw new Error(`Evolução com id ${id} não encontrada`);
    await PatientEvolutionRepository.delete(id);
  }
}
