import { AuthRepository } from "../../repository/auth/IAuthRepository";
import { ILogoutUseCase } from "./interfaces/ILogoutUseCase";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(token: string): Promise<void> {
    if (!token.trim()) {
      throw new Error("Token is required");
    }

    const isValidToken = await this.authRepository.validateToken(token);

    if (!isValidToken) {
      throw new Error("Invalid token");
    }

    await this.authRepository.logout(token);
  }
}
