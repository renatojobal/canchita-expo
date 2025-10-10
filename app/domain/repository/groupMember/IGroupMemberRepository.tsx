import { GroupMember } from "../../entities/GroupMember";

export interface IGroupMemberRepository {
  addMember(memberData: AddGroupMemberRequest): Promise<GroupMember>;
  getMemberById(id: string): Promise<GroupMember | null>;
  getMembersByGroup(groupId: string): Promise<GroupMember[]>;
  updateMember(id: string, memberData: Partial<GroupMember>): Promise<GroupMember>;
  removeMember(id: string): Promise<void>;
  linkMemberToProfile(memberId: string, profileId: string): Promise<GroupMember>;
}

export interface AddGroupMemberRequest {
  group_id: string;
  name: string;
  email: string;
  user_profile_id?: string;
  is_placeholder?: boolean;
}
