import { UserProfile } from "../../../entities/UserProfile";

export interface CreateUserProfileRequest {
  email: string;
  name: string;
  photo_url?: string;
}

export interface ICreateUserProfileUseCase {
  execute(userData: CreateUserProfileRequest): Promise<UserProfile>;
}
