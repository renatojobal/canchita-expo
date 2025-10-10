import { GroupMember } from "../../../entities/GroupMember";

export interface UpdateGroupMemberRequest {
  name?: string;
  email?: string;
}

export interface IUpdateGroupMemberUseCase {
  execute(id: string, memberData: UpdateGroupMemberRequest): Promise<GroupMember>;
}
