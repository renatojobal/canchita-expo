import { GroupMember } from "../../../entities/GroupMember";

export interface AddGroupMemberRequest {
  group_id: string;
  name: string;
  email: string;
  user_profile_id?: string;
  is_placeholder?: boolean;
}

export interface IAddGroupMemberUseCase {
  execute(memberData: AddGroupMemberRequest): Promise<GroupMember>;
}
