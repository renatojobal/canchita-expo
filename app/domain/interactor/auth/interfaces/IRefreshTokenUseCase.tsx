import { AuthResponse } from "../../entities/AuthResponse";

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<AuthResponse>;
}