import { IUserProfileRepository } from "../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../entities/UserProfile";
import { IVerifyUserProfileUseCase } from "./interfaces/IVerifyUserProfileUseCase";

export class VerifyUserProfileUseCase implements IVerifyUserProfileUseCase {
  constructor(private userProfileRepository: IUserProfileRepository) {}

  async execute(id: string): Promise<UserProfile> {
    if (!id.trim()) {
      throw new Error("User profile ID is required");
    }

    const existingProfile = await this.userProfileRepository.getUserProfileById(id);
    if (!existingProfile) {
      throw new Error("User profile not found");
    }

    if (existingProfile.is_verified) {
      throw new Error("User profile is already verified");
    }

    return await this.userProfileRepository.verifyUserProfile(id);
  }
}
