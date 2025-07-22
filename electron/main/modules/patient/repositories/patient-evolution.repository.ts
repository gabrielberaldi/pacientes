import db from "../../../infra/database/connection";
import { RequireId } from "../../utils/requiredId.type";
import { Evolution } from "../models/evolution.model";

export class PatientEvolutionRepository {

  static getAllByPatientId(patientId: number): Promise<Evolution[]> {
    return new Promise((resolve, reject) => {
      db.all<Evolution>("SELECT * FROM patientEvolutions WHERE patientId = ? ORDER BY date DESC", [patientId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static getById(id: number): Promise<Evolution | undefined> {
    return new Promise((resolve, reject) => {
      db.get<Evolution>("SELECT * FROM patientEvolutions WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ?? undefined);
      });
    });
  }

  static create(evolution: Evolution): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO patientEvolutions (patientId, date, text) VALUES (?, ?, ?)`;
      const values = [ evolution.patientId, evolution.date, evolution.text ];
      db.run(query, values, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static update(evolution: RequireId<Evolution>): Promise<void> {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(evolution).map(key => `${key} = ?`).join(', ');
      const values = Object.values(evolution);
      db.run(`UPDATE patientEvolutions SET ${fields} WHERE id = ?`, [...values], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM patientEvolutions WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
