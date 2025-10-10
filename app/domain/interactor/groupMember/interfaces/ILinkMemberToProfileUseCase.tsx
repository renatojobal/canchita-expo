import { GroupMember } from "../../../entities/GroupMember";

export interface ILinkMemberToProfileUseCase {
  execute(memberId: string, profileId: string): Promise<GroupMember>;
}
