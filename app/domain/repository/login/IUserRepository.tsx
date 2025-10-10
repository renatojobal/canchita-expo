import { AuthResponse } from "../../entities/Session";
import { User } from "../../entities/User";
import { CreateUserRequest } from "../../interactor/auth/interfaces/ICreateUserUseCase";
import { LoginRequest } from "../../interactor/auth/interfaces/ILoginUseCase";

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
