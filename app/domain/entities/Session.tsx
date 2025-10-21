import { UserProfile } from "./UserProfile";

export interface AuthResponse {
    user: UserProfile;
    token: string;
    refreshToken: string;
  }