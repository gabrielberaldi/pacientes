import db from "../../../infra/database/connection";
import { RequireId } from "../../utils/requiredId.type";
import { PatientListDto } from "../models/patient-list-dto.model";
import { PatientRegisterDto } from "../models/patient-register-dto.model";
import { Patient } from "../models/patient.model";

export class PatientRepository {
  
  static getAll(): Promise<PatientListDto[]> {
    return new Promise((resolve, reject) => {
      db.all<PatientListDto>("SELECT id, nome, sexo, dataNascimento, nomeMae FROM patients", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static getById(id: number): Promise<Patient | undefined> {
    return new Promise((resolve, reject) => {
      db.get<Patient>("SELECT * FROM patients WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ?? undefined);
      });
    });
  }

  static create(patient: PatientRegisterDto): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO patients (
          nome, dataNascimento, sexo, contato, nomePai, nomeMae, bairro,
          cep, logradouro, tipoLogradouro, numero, diaDaSessao,
          horario, evolucao
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        patient.nome,
        patient.dataNascimento,
        patient.sexo,    
        patient.contato,
        patient.nomePai,
        patient.nomeMae,
        patient.bairro ?? null,
        patient.cep ?? null,
        patient.logradouro ?? null,
        patient.tipoLogradouro ?? null,
        patient.numero ?? null,
        patient.diaDaSessao,
        patient.horario,
        patient.evolucao
      ];

      db.run(query, values, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static update(patient:RequireId<PatientRegisterDto>): Promise<void> {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(patient).map((key) => `${key} = ?`).join(', ');
      const values = Object.values(patient);

      db.run(`UPDATE patients SET ${fields} WHERE id = ?`, [...values],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM patients WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}