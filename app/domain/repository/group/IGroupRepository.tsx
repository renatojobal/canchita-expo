import { Group } from "../../entities/Group";

export interface IGroupRepository {
  createGroup(groupData: CreateGroupRequest): Promise<Group>;
  getGroupById(id: string): Promise<Group | null>;
  getGroupsByOwner(ownerProfileId: string): Promise<Group[]>;
  updateGroup(id: string, groupData: Partial<Group>): Promise<Group>;
  deleteGroup(id: string): Promise<void>;
}

export interface CreateGroupRequest {
  name: string;
  owner_profile_id: string;
}
