import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { Group } from "../../entities/Group";
import { UpdateGroupRequest, IUpdateGroupUseCase } from "./interfaces/IUpdateGroupUseCase";

export class UpdateGroupUseCase implements IUpdateGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string, groupData: UpdateGroupRequest): Promise<Group> {
    if (!id.trim()) {
      throw new Error("Group ID is required");
    }

    const existingGroup = await this.groupRepository.getGroupById(id);
    if (!existingGroup) {
      throw new Error("Group not found");
    }

    if (groupData.name !== undefined && !groupData.name.trim()) {
      throw new Error("Group name cannot be empty");
    }

    return await this.groupRepository.updateGroup(id, groupData);
  }
}
