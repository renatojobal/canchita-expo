import { AuthRepository } from "../../repository/auth/IAuthRepository";
import { AuthResponse } from "../../entities/Session";
import { IRefreshTokenUseCase } from "./interfaces/IRefreshTokenUseCase";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken.trim()) {
      throw new Error("Refresh token is required");
    }

    try {
      return await this.authRepository.refreshToken(refreshToken);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}
