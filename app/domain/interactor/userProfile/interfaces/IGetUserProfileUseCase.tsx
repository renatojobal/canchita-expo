import { UserProfile } from "../../../entities/UserProfile";

export interface IGetUserProfileUseCase {
  execute(id: string): Promise<UserProfile | null>;
}
