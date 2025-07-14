import db from "../../../infra/database/connection";
import { UserRegisterDto } from "../models/user-register-dto.model";
import { User } from "../models/user.model";

export class UserRepository {

  static getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      db.all<User>("SELECT id, nome, email, data_criacao FROM users", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      db.get<User>("SELECT id, nome, email , data_criacao FROM users WHERE id = ?", [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      db.get<User>("SELECT id, nome, email, senha, data_criacao FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async create(user: UserRegisterDto): Promise<number> {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)", [user.nome, user.email, user.senha], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static async update(user: User): Promise<void> {
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