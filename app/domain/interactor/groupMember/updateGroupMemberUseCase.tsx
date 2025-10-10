import { IGroupMemberRepository } from "../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../entities/GroupMember";
import { UpdateGroupMemberRequest, IUpdateGroupMemberUseCase } from "./interfaces/IUpdateGroupMemberUseCase";

export class UpdateGroupMemberUseCase implements IUpdateGroupMemberUseCase {
  constructor(private groupMemberRepository: IGroupMemberRepository) {}

  async execute(id: string, memberData: UpdateGroupMemberRequest): Promise<GroupMember> {
    if (!id.trim()) {
      throw new Error("Member ID is required");
    }

    const existingMember = await this.groupMemberRepository.getMemberById(id);
    if (!existingMember) {
      throw new Error("Member not found");
    }

    if (memberData.name !== undefined && !memberData.name.trim()) {
      throw new Error("Member name cannot be empty");
    }

    if (memberData.email !== undefined && !this.isValidEmail(memberData.email)) {
      throw new Error("Invalid email format");
    }

    return await this.groupMemberRepository.updateMember(id, memberData);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
