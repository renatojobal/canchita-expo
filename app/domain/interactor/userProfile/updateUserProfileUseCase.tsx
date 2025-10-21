import { IUserRepository } from "../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../entities/UserProfile";
import { UpdateUserProfileRequest, IUpdateUserProfileUseCase } from "./interfaces/IUpdateUserProfileUseCase";

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, userData: UpdateUserProfileRequest): Promise<UserProfile> {
    if (!id.trim()) {
      throw new Error("User profile ID is required");
    }

    const existingProfile = await this.userRepository.getUserById(id);
    if (!existingProfile) {
      throw new Error("User profile not found");
    }

    if (userData.name !== undefined && !userData.name.trim()) {
      throw new Error("Name cannot be empty");
    }

    return await this.userRepository.updateUser(id, userData);
  }
}
