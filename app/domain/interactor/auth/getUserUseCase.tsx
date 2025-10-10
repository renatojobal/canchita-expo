import { IUserRepository } from "../../repository/login/IUserRepository";
import { User } from "../../entities/User";
import { IGetUserUseCase } from "./interfaces/IGetUserUseCase";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async executeById(id: string): Promise<User> {
    if (!id.trim()) {
      throw new Error("User ID is required");
    }

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async executeByEmail(email: string): Promise<User> {
    if (!email.trim()) {
      throw new Error("Email is required");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
