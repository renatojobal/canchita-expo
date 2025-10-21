import { UserProfile } from "../../entities/UserProfile";

export interface IUserRepository {
  // User profile management
  createUserProfile(userData: CreateUserProfileRequest): Promise<UserProfile>;
  getUserById(id: string): Promise<UserProfile | null>;
  getUserByEmail(email: string): Promise<UserProfile | null>;
  updateUser(id: string, userData: Partial<UserProfile>): Promise<UserProfile>;
  deleteUser(id: string): Promise<void>;
  verifyUserProfile(id: string): Promise<UserProfile>;
}

export interface CreateUserProfileRequest {
  email: string;
  name: string;
  photo_url?: string;
}
