import db from "../../../infra/database/connection";
import { UserModel } from "../models/user.model";

export class UserRepository {

  static getAll(): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      db.all<UserModel>("SELECT id, nome, email FROM users", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id: number): Promise<UserModel | undefined> {
    return new Promise((resolve, reject) => {
      db.get<UserModel>("SELECT id, nome, email FROM users WHERE id = ?", [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getByEmail(email: string): Promise<UserModel | undefined> {
    return new Promise((resolve, reject) => {
      db.get<UserModel>("SELECT id, nome, email FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async create(user: UserModel): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentDate = new Date().toISOString();
      db.run("INSERT INTO users (nome, email) VALUES (?, ?)", [user.nome, user.email, currentDate], (err) =>  {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static async update(user: UserModel): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run("UPDATE users SET nome = ?, email = ? WHERE id = ?", [user.nome, user.email, user.id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static async delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

}