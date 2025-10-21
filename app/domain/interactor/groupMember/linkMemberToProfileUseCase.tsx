import { IGroupMemberRepository } from "../../repository/groupMember/IGroupMemberRepository";
import { IUserRepository } from "../../repository/userProfile/IUserRepository";
import { GroupMember } from "../../entities/GroupMember";
import { ILinkMemberToProfileUseCase } from "./interfaces/ILinkMemberToProfileUseCase";

export class LinkMemberToProfileUseCase implements ILinkMemberToProfileUseCase {
  constructor(
    private groupMemberRepository: IGroupMemberRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(memberId: string, profileId: string): Promise<GroupMember> {
    if (!memberId.trim()) {
      throw new Error("Member ID is required");
    }

    if (!profileId.trim()) {
      throw new Error("Profile ID is required");
    }

    const member = await this.groupMemberRepository.getMemberById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    const profile = await this.userRepository.getUserById(profileId);
    if (!profile) {
      throw new Error("User profile not found");
    }

    if (member.user_profile_id) {
      throw new Error("Member is already linked to a profile");
    }

    return await this.groupMemberRepository.linkMemberToProfile(memberId, profileId);
  }
}
