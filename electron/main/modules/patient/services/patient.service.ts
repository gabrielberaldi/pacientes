import { RequireId } from "../../utils/requiredId.type";
import { PatientListDto } from "../models/patient-list-dto.model";
import { PatientRegisterDto } from "../models/patient-register-dto.model";
import { Patient } from "../models/patient.model";
import { PatientRepository } from "../repositories/patient.repository";

export class PatientService {

  static async listAllPatients(): Promise<PatientListDto[]> {
    return PatientRepository.getAll();
  }

  static async getPatientById(id: number): Promise<Patient> {
    const patient = await PatientRepository.getById(id);
    if (!patient) throw new Error(`Paciente com id ${id} não encontrado`);
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

  static async updatePatient({ id, ...patient }: RequireId<PatientRegisterDto>): Promise<void> {
    const existing = await PatientRepository.getById(id);
    if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
    const dtoToPersist = { ...patient };
    dtoToPersist.dataNascimento = new Date(dtoToPersist.dataNascimento).toISOString().split('T')[0];
    await PatientRepository.update({ id, ...dtoToPersist });
  }

  static async deletePatient(id: number): Promise<void> {
    const existing = await PatientRepository.getById(id);
    if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
    await PatientRepository.delete(id);
  }

}