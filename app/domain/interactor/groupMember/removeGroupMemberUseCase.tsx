import { IGroupMemberRepository } from "../../repository/groupMember/IGroupMemberRepository";
import { IRemoveGroupMemberUseCase } from "./interfaces/IRemoveGroupMemberUseCase";

export class RemoveGroupMemberUseCase implements IRemoveGroupMemberUseCase {
  constructor(private groupMemberRepository: IGroupMemberRepository) {}

  async execute(id: string): Promise<void> {
    if (!id.trim()) {
      throw new Error("Member ID is required");
    }

    const existingMember = await this.groupMemberRepository.getMemberById(id);
    if (!existingMember) {
      throw new Error("Member not found");
    }

    await this.groupMemberRepository.removeMember(id);
  }
}
