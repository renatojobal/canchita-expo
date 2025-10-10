import { Group } from "../../../entities/Group";

export interface CreateGroupRequest {
  name: string;
  owner_profile_id: string;
}

export interface ICreateGroupUseCase {
  execute(groupData: CreateGroupRequest): Promise<Group>;
}
