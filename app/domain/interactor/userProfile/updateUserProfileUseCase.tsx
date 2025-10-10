import { IUserProfileRepository } from "../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../entities/UserProfile";
import { UpdateUserProfileRequest, IUpdateUserProfileUseCase } from "./interfaces/IUpdateUserProfileUseCase";

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase {
  constructor(private userProfileRepository: IUserProfileRepository) {}

  async execute(id: string, userData: UpdateUserProfileRequest): Promise<UserProfile> {
    if (!id.trim()) {
      throw new Error("User profile ID is required");
    }

    const existingProfile = await this.userProfileRepository.getUserProfileById(id);
    if (!existingProfile) {
      throw new Error("User profile not found");
    }

    if (userData.name !== undefined && !userData.name.trim()) {
      throw new Error("Name cannot be empty");
    }

    return await this.userProfileRepository.updateUserProfile(id, userData);
  }
}
