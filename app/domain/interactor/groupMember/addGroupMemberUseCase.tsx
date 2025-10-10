import { IGroupMemberRepository } from "../../repository/groupMember/IGroupMemberRepository";
import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { GroupMember } from "../../entities/GroupMember";
import { AddGroupMemberRequest, IAddGroupMemberUseCase } from "./interfaces/IAddGroupMemberUseCase";

export class AddGroupMemberUseCase implements IAddGroupMemberUseCase {
  constructor(
    private groupMemberRepository: IGroupMemberRepository,
    private groupRepository: IGroupRepository
  ) {}

  async execute(memberData: AddGroupMemberRequest): Promise<GroupMember> {
    if (!memberData.group_id.trim()) {
      throw new Error("Group ID is required");
    }

    if (!memberData.name.trim()) {
      throw new Error("Member name is required");
    }

    if (!this.isValidEmail(memberData.email)) {
      throw new Error("Invalid email format");
    }

    const group = await this.groupRepository.getGroupById(memberData.group_id);
    if (!group) {
      throw new Error("Group not found");
    }

    return await this.groupMemberRepository.addMember(memberData);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
