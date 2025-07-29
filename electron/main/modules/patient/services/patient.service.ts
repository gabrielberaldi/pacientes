import { RequireId } from "../../utils/requiredId.type";
import { Evolution } from "../models/evolution.model";
import { PatientListDto } from "../models/patient-list-dto.model";
import { PatientRegisterDto } from "../models/patient-register-dto.model";
import { Patient } from "../models/patient.model";
import { PatientEvolutionRepository } from "../repositories/patient-evolution.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientEvolutionService } from "./patient-evolution.service";

export class PatientService {

  static async listAllPatients(): Promise<PatientListDto[]> {
    return await PatientRepository.getAll();
  }

  static async getPatientById(id: number): Promise<Patient> {
    const patient = await PatientRepository.getById(id);
    if (!patient) throw new Error(`Paciente com id ${id} não encontrado`);
    patient.evolucoes = await PatientEvolutionRepository.getAllByPatientId(id);
    return patient;
  }

  static async createPatient(patientDto: PatientRegisterDto): Promise<Patient> {
    const dtoToPersist = { ...patientDto };
    dtoToPersist.dataNascimento = new Date(dtoToPersist.dataNascimento).toISOString().split('T')[0];
    const id = await PatientRepository.create(dtoToPersist);
    const patient = await PatientRepository.getById(id);
    if (!patient) throw new Error('Erro ao buscar paciente após criação');
    return patient;
  }

  static async updatePatient(patientDto: RequireId<PatientRegisterDto>): Promise<void> {
    const { evolucoes, ...patientData } = patientDto;
    const existing = await PatientRepository.getById(patientDto.id);
    if (!existing) throw new Error(`Paciente com id ${patientDto.id} não encontrado`);
    const dtoToPersist = { ...patientData };
    dtoToPersist.dataNascimento = new Date(dtoToPersist.dataNascimento).toISOString().split('T')[0];
    await PatientRepository.update({ ...dtoToPersist });
    if (evolucoes) {
      await PatientEvolutionService.syncEvolutions(patientDto.id, evolucoes);
    }
  }


  static async deletePatient(id: number): Promise<void> {
    const existing = await PatientRepository.getById(id);
    if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
    await PatientRepository.delete(id);
  }

}