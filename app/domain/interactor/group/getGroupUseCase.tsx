import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { Group } from "../../entities/Group";
import { IGetGroupUseCase } from "./interfaces/IGetGroupUseCase";

export class GetGroupUseCase implements IGetGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string): Promise<Group | null> {
    if (!id.trim()) {
      throw new Error("Group ID is required");
    }

    return await this.groupRepository.getGroupById(id);
  }
}
