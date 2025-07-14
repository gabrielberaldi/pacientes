import { UserDto } from "../../user/models/user-dto.model";
import { UserLoginDto } from "../../user/models/user-login-dto.model";
import { UserRegisterDto } from "../../user/models/user-register-dto.model";
import { UserRepository } from "../../user/repositories/user.repository";

export class AuthService {  

  static async login(newUser: UserLoginDto): Promise<UserDto> {
    const user = await UserRepository.getByEmail(newUser.email);
   
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    if (user.senha !== newUser.senha) {
      throw new Error('Senha incorreta');
    }

    const { senha, data_criacao, ...rest } = user;
    return { dataCriacao: data_criacao, ...rest } as UserDto;
  }

  static async register({ nome, email, senha }: UserRegisterDto): Promise<UserDto> {
    const existingUser = await UserRepository.getByEmail(email);

    if (existingUser) {
      throw new Error('Email já cadastrado.');
    }

    const userId = await UserRepository.create({ nome, email, senha });
    const user = await UserRepository.getById(userId);
    
    if (!user) {
      throw new Error('Falha ao encontrar usuario')
    } 

    const { data_criacao, ...rest } = user;
    return { ...rest, dataCriacao: data_criacao} as UserDto;
  }

}