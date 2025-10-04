import { AuthResponse } from "../../entities/AuthResponse";
import { User } from "../../entities/User";

export interface ILoginUseCase {
  execute(credentials: LoginRequest): Promise<AuthResponse>;
}

export interface LoginRequest {
  email: string;
  password: string;
}
