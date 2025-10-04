import { IUserRepository } from '../repositories/IUserRepository';
import { AuthResponse } from '../entities/User';

export class RefreshTokenUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken.trim()) {
      throw new Error('Refresh token is required');
    }

    try {
      return await this.userRepository.refreshToken(refreshToken);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}