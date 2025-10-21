import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { IUserRepository } from "../../repository/userProfile/IUserRepository";
import { Group } from "../../entities/Group";
import { CreateGroupRequest, ICreateGroupUseCase } from "./interfaces/ICreateGroupUseCase";

export class CreateGroupUseCase implements ICreateGroupUseCase {
  constructor(
    private groupRepository: IGroupRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(groupData: CreateGroupRequest): Promise<Group> {
    if (!groupData.name.trim()) {
      throw new Error("Group name is required");
    }

    if (!groupData.owner_profile_id.trim()) {
      throw new Error("Owner profile ID is required");
    }

    const ownerProfile = await this.userRepository.getUserById(groupData.owner_profile_id);
    if (!ownerProfile) {
      throw new Error("Owner profile not found");
    }

    return await this.groupRepository.createGroup(groupData);
  }
}
