import { Group } from "../../../entities/Group";

export interface IGetGroupsByOwnerUseCase {
  execute(ownerProfileId: string): Promise<Group[]>;
}
