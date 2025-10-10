import { IUserRepository } from "../../repository/login/IUserRepository";
import { AuthRepository } from "../../repository/auth/IAuthRepository";
import { AuthResponse } from "../../entities/Session";
import { LoginRequest, ILoginUseCase } from "./interfaces/ILoginUseCase";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(credentials: LoginRequest): Promise<AuthResponse> {
    if (!this.isValidEmail(credentials.email)) {
      throw new Error("Invalid email format");
    }

    if (!credentials.password.trim()) {
      throw new Error("Password is required");
    }

    const user = await this.userRepository.getUserByEmail(credentials.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    return await this.authRepository.login(credentials);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
