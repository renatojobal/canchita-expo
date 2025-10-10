import { IGroupMemberRepository } from "../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../entities/GroupMember";
import { IGetGroupMemberUseCase } from "./interfaces/IGetGroupMemberUseCase";

export class GetGroupMemberUseCase implements IGetGroupMemberUseCase {
  constructor(private groupMemberRepository: IGroupMemberRepository) {}

  async execute(id: string): Promise<GroupMember | null> {
    if (!id.trim()) {
      throw new Error("Member ID is required");
    }

    return await this.groupMemberRepository.getMemberById(id);
  }
}
