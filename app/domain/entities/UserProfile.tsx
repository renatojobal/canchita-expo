export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  photo_url?: string;
  avatar?: string;
  is_verified: boolean;
  isActive: boolean;
  created_at: Date;
  createdAt: Date;
  updatedAt: Date;
}
