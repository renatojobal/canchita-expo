import { AuthResponse } from "../entities/AuthResponse";
import { User } from "../entities/User";
import { CreateUserRequest } from "../usecase/interfaces/ICreateUserUseCase";
import { LoginRequest } from "../usecase/interfaces/ILoginUseCase";

export interface IUserRepository {
  createUser(userData: CreateUserRequest): Promise<AuthResponse>;
  login(credentials: LoginRequest): Promise<AuthResponse>;
  logout(token: string): Promise<void>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthResponse>;
  validateToken(token: string): Promise<boolean>;
}
