import { AuthResponse } from '../../entities/User';

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<AuthResponse>;
}