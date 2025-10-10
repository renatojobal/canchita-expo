import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { IUserProfileRepository } from "../../repository/userProfile/IUserProfileRepository";
import { Group } from "../../entities/Group";
import { CreateGroupRequest, ICreateGroupUseCase } from "./interfaces/ICreateGroupUseCase";

export class CreateGroupUseCase implements ICreateGroupUseCase {
  constructor(
    private groupRepository: IGroupRepository,
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute(groupData: CreateGroupRequest): Promise<Group> {
    if (!groupData.name.trim()) {
      throw new Error("Group name is required");
    }

    if (!groupData.owner_profile_id.trim()) {
      throw new Error("Owner profile ID is required");
    }

    const ownerProfile = await this.userProfileRepository.getUserProfileById(groupData.owner_profile_id);
    if (!ownerProfile) {
      throw new Error("Owner profile not found");
    }

    return await this.groupRepository.createGroup(groupData);
  }
}
