import { IUserRepository } from '../repositories/IUserRepository';
import { LoginRequest, AuthResponse } from '../entities/User';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(credentials: LoginRequest): Promise<AuthResponse> {
    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format');
    }

    if (!credentials.password.trim()) {
      throw new Error('Password is required');
    }

    const user = await this.userRepository.getUserByEmail(credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    return await this.userRepository.login(credentials);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}