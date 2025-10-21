import { AuthResponse } from "../../../entities/Session";

export interface ILoginUseCase {
  execute(credentials: LoginRequest): Promise<AuthResponse>;
}

export interface LoginRequest {
  email: string;
  password: string;
}
