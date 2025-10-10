import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { IDeleteGroupUseCase } from "./interfaces/IDeleteGroupUseCase";

export class DeleteGroupUseCase implements IDeleteGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string): Promise<void> {
    if (!id.trim()) {
      throw new Error("Group ID is required");
    }

    const existingGroup = await this.groupRepository.getGroupById(id);
    if (!existingGroup) {
      throw new Error("Group not found");
    }

    await this.groupRepository.deleteGroup(id);
  }
}
