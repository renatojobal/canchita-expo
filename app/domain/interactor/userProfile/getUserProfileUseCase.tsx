import { IUserRepository } from "../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../entities/UserProfile";
import { IGetUserProfileUseCase } from "./interfaces/IGetUserProfileUseCase";

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserProfile | null> {
    if (!id.trim()) {
      throw new Error("User profile ID is required");
    }

    return await this.userRepository.getUserById(id);
  }
}
