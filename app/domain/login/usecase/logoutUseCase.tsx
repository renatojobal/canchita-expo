import { IUserRepository } from '../repositories/IUserRepository';

export class LogoutUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(token: string): Promise<void> {
    if (!token.trim()) {
      throw new Error('Token is required');
    }

    const isValidToken = await this.userRepository.validateToken(token);
    
    if (!isValidToken) {
      throw new Error('Invalid token');
    }

    await this.userRepository.logout(token);
  }
}