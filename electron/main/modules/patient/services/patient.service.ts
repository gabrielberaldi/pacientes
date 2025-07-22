import { RequireId } from "../../utils/requiredId.type";
import { Evolution } from "../models/evolution.model";
import { PatientListDto } from "../models/patient-list-dto.model";
import { PatientRegisterDto } from "../models/patient-register-dto.model";
import { Patient } from "../models/patient.model";
import { PatientEvolutionRepository } from "../repositories/patient-evolution.repository";
import { PatientRepository } from "../repositories/patient.repository";

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

  // static async updatePatient({ id, ...patient }: RequireId<PatientRegisterDto>): Promise<void> {
  //   const existing = await PatientRepository.getById(id);
  //   if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
  //   const dtoToPersist = { ...patient };
  //   dtoToPersist.dataNascimento = new Date(dtoToPersist.dataNascimento).toISOString().split('T')[0];
  //   await PatientRepository.update({ id, ...dtoToPersist });
  // }

  static async updatePatient(patientDto: RequireId<PatientRegisterDto>): Promise<void> {
    const { evolucoes, ...patientData } = patientDto;
    const existing = await PatientRepository.getById(patientDto.id);
    if (!existing) throw new Error(`Paciente com id ${patientDto.id} não encontrado`);
    const dtoToPersist = { ...patientData };
    dtoToPersist.dataNascimento = new Date(dtoToPersist.dataNascimento).toISOString().split('T')[0];
    await PatientRepository.update({ ...dtoToPersist });

    if (!evolucoes) return;
    const currentEvolutions = await PatientEvolutionRepository.getAllByPatientId(patientDto.id);
    const receivedIds = evolucoes.filter(e => e.id).map(e => e.id!);
    const toDelete = currentEvolutions.filter(e => !receivedIds.includes(e.id as number));

    await Promise.all(toDelete.map(evo => PatientEvolutionRepository.delete(evo.id as number)));

    await Promise.all(evolucoes.map(evo => {
      if (evo.id) {
        return PatientEvolutionRepository.update(evo as RequireId<Evolution>);
      } else {
        return PatientEvolutionRepository.create({
          patientId: patientDto.id,
          date: evo.date,
          text: evo.text,
        });
      }})
    );

  }

  static async deletePatient(id: number): Promise<void> {
    const existing = await PatientRepository.getById(id);
    if (!existing) throw new Error(`Paciente com id ${id} não encontrado`);
    await PatientRepository.delete(id);
  }

}