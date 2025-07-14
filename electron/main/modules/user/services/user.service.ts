
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService { 

  static async getAllUsers(): Promise<User[]> {
    return await UserRepository.getAll();
  }

  static async getUserById(id: number): Promise<User | undefined> {
    const user = await UserRepository.getById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await UserRepository.getByEmail(email);
     if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  static async createUser(user: User): Promise<void> {
    if (!user.nome || !user.email) {
      throw new Error('Nome e email são obrigatórios.');
    }

    const exists = await UserRepository.getByEmail(user.email);
    if (exists) {
      throw new Error(`Já existe um usuário com o email ${user.email}.`);
    }

    await UserRepository.create(user);
  }

  static async updateUser(user: User): Promise<void> {
    if (!user.id) {
      throw new Error('ID do usuário é obrigatório para atualizar.');
    }

    if (!user.nome || !user.email) {
      throw new Error('Nome e email são obrigatórios.');
    }

    const exists = await UserRepository.getById(user.id);
    if (!exists) {
      throw new Error(`Usuário com ID ${user.id} não encontrado.`);
    }

    const userWithSameEmail = await UserRepository.getByEmail(user.email);
    if (userWithSameEmail && userWithSameEmail.id !== user.id) {
      throw new Error(`Já existe outro usuário com o email ${user.email}.`);
    }

    await UserRepository.update(user);
  }

  static async deleteUser(id: number): Promise<void> {
    await UserRepository.delete(id);
  }

}
