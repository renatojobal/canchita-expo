export interface UserProfile {
  id: string;
  email: string;
  name: string;
  photo_url?: string;
  is_verified: boolean;
  created_at: Date;
}
