import { AuthResponse } from "../../entities/Session";
import { IUserRepository } from "../../repository/login/IUserRepository";
import { AuthRepository } from "../../repository/auth/IAuthRepository";
import {
  CreateUserRequest,
  ICreateUserUseCase,
} from "./interfaces/ICreateUserUseCase";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: CreateUserRequest): Promise<AuthResponse> {
    const existingUser = await this.userRepository.getUserByEmail(userData.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error("Invalid email format");
    }

    if (!this.isValidPassword(userData.password)) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (!userData.username.trim()) {
      throw new Error("Username is required");
    }

    if (!userData.firstName.trim() || !userData.lastName.trim()) {
      throw new Error("First name and last name are required");
    }

    return await this.authRepository.createUser(userData);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }
}
