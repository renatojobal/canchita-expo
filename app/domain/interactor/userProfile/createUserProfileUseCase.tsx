import { IUserProfileRepository } from "../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../entities/UserProfile";
import { CreateUserProfileRequest, ICreateUserProfileUseCase } from "./interfaces/ICreateUserProfileUseCase";

export class CreateUserProfileUseCase implements ICreateUserProfileUseCase {
  constructor(private userProfileRepository: IUserProfileRepository) {}

  async execute(userData: CreateUserProfileRequest): Promise<UserProfile> {
    if (!this.isValidEmail(userData.email)) {
      throw new Error("Invalid email format");
    }

    if (!userData.name.trim()) {
      throw new Error("Name is required");
    }

    const existingProfile = await this.userProfileRepository.getUserProfileByEmail(userData.email);
    if (existingProfile) {
      throw new Error("User profile with this email already exists");
    }

    return await this.userProfileRepository.createUserProfile(userData);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
