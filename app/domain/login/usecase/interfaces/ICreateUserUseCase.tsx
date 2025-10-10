import { AuthResponse } from "../../entities/AuthResponse";

export interface ICreateUserUseCase {
  execute(userData: CreateUserRequest): Promise<AuthResponse>;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}