import { LoginRequest, AuthResponse } from '../../entities/User';

export interface ILoginUseCase {
  execute(credentials: LoginRequest): Promise<AuthResponse>;
}