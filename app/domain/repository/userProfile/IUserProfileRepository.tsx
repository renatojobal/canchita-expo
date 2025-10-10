import { UserProfile } from "../../entities/UserProfile";

export interface IUserProfileRepository {
  createUserProfile(userData: CreateUserProfileRequest): Promise<UserProfile>;
  getUserProfileById(id: string): Promise<UserProfile | null>;
  getUserProfileByEmail(email: string): Promise<UserProfile | null>;
  updateUserProfile(id: string, userData: Partial<UserProfile>): Promise<UserProfile>;
  deleteUserProfile(id: string): Promise<void>;
  verifyUserProfile(id: string): Promise<UserProfile>;
}

export interface CreateUserProfileRequest {
  email: string;
  name: string;
  photo_url?: string;
}
