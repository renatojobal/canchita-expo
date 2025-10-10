import { GroupMember } from "../../../entities/GroupMember";

export interface IGetGroupMemberUseCase {
  execute(id: string): Promise<GroupMember | null>;
}
