import { UserProfile } from "../../../entities/UserProfile";

export interface IVerifyUserProfileUseCase {
  execute(id: string): Promise<UserProfile>;
}
