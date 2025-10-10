import { IGroupMemberRepository } from "../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../entities/GroupMember";
import { IGetMembersByGroupUseCase } from "./interfaces/IGetMembersByGroupUseCase";

export class GetMembersByGroupUseCase implements IGetMembersByGroupUseCase {
  constructor(private groupMemberRepository: IGroupMemberRepository) {}

  async execute(groupId: string): Promise<GroupMember[]> {
    if (!groupId.trim()) {
      throw new Error("Group ID is required");
    }

    return await this.groupMemberRepository.getMembersByGroup(groupId);
  }
}
