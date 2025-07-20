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
    const id = await PatientRepository.create(patientDto);
    const patient = await PatientRepository.getById(id);
    if (!patient) throw new Error('Erro ao buscar paciente após criação');
    return patient;
  }

  static async updatePatient({ id, ...patient }: RequireId<PatientRegisterDto>): Promise<void> {
    const existing = await PatientRepository.getById(id);
    if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
    await PatientRepository.update({ id, ...patient });
  }

  static async deletePatient(id: number): Promise<void> {
    const existing = await PatientRepository.getById(id);
    if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
    await PatientRepository.delete(id);
  }

}