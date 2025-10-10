import { GroupMember } from "../../../entities/GroupMember";

export interface IGetMembersByGroupUseCase {
  execute(groupId: string): Promise<GroupMember[]>;
}
