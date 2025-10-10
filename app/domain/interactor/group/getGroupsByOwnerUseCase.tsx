import { IGroupRepository } from "../../repository/group/IGroupRepository";
import { Group } from "../../entities/Group";
import { IGetGroupsByOwnerUseCase } from "./interfaces/IGetGroupsByOwnerUseCase";

export class GetGroupsByOwnerUseCase implements IGetGroupsByOwnerUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(ownerProfileId: string): Promise<Group[]> {
    if (!ownerProfileId.trim()) {
      throw new Error("Owner profile ID is required");
    }

    return await this.groupRepository.getGroupsByOwner(ownerProfileId);
  }
}
