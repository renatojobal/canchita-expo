import { UserProfile } from "../../../entities/UserProfile";

export interface UpdateUserProfileRequest {
  name?: string;
  photo_url?: string;
}

export interface IUpdateUserProfileUseCase {
  execute(id: string, userData: UpdateUserProfileRequest): Promise<UserProfile>;
}
