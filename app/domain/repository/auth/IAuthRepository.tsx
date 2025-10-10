import { AuthResponse } from "../../entities/Session";
import { CreateUserRequest } from "../../interactor/auth/interfaces/ICreateUserUseCase";
import { LoginRequest } from "../../interactor/auth/interfaces/ILoginUseCase";

export interface AuthRepository {
    createUser(userData: CreateUserRequest): Promise<AuthResponse>;
      login(credentials: LoginRequest): Promise<AuthResponse>;
      logout(token: string): Promise<void>;
      refreshToken(refreshToken: string): Promise<AuthResponse>;
      validateToken(token: string): Promise<boolean>;
}