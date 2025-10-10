export interface GroupMember {
  id: string;
  group_id: string;
  name: string;
  email: string;
  user_profile_id?: string;
  is_placeholder: boolean;
  joined_at: Date;
}
