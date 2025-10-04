import { CreateUserRequest, AuthResponse } from '../../entities/User';

export interface ICreateUserUseCase {
  execute(userData: CreateUserRequest): Promise<AuthResponse>;
}