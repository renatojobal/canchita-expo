import { IUserProfileRepository } from "../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../entities/UserProfile";
import { IGetUserProfileUseCase } from "./interfaces/IGetUserProfileUseCase";

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(private userProfileRepository: IUserProfileRepository) {}

  async execute(id: string): Promise<UserProfile | null> {
    if (!id.trim()) {
      throw new Error("User profile ID is required");
    }

    return await this.userProfileRepository.getUserProfileById(id);
  }
}
