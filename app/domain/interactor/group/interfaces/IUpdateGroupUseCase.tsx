import { Group } from "../../../entities/Group";

export interface UpdateGroupRequest {
  name?: string;
}

export interface IUpdateGroupUseCase {
  execute(id: string, groupData: UpdateGroupRequest): Promise<Group>;
}
