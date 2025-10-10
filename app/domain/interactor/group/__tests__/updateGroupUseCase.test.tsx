import { UpdateGroupUseCase } from "../updateGroupUseCase";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { Group } from "../../../entities/Group";
import { UpdateGroupRequest } from "../interfaces/IUpdateGroupUseCase";

describe("UpdateGroupUseCase", () => {
  let updateGroupUseCase: UpdateGroupUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    updateGroupUseCase = new UpdateGroupUseCase(mockGroupRepository);
  });

  describe("execute", () => {
    const mockGroup: Group = {
      id: "group-1",
      name: "Test Group",
      owner_profile_id: "user-1",
      created_at: new Date(),
    };

    const updatedGroup: Group = {
      ...mockGroup,
      name: "Updated Group Name",
    };

    it("should update group successfully", async () => {
      const updateData: UpdateGroupRequest = {
        name: "Updated Group Name",
      };

      mockGroupRepository.getGroupById.mockResolvedValue(mockGroup);
      mockGroupRepository.updateGroup.mockResolvedValue(updatedGroup);

      const result = await updateGroupUseCase.execute("group-1", updateData);

      expect(result).toEqual(updatedGroup);
      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-1");
      expect(mockGroupRepository.updateGroup).toHaveBeenCalledWith("group-1", updateData);
    });

    it("should throw error if ID is empty", async () => {
      const updateData: UpdateGroupRequest = {
        name: "Updated Group Name",
      };

      await expect(updateGroupUseCase.execute("   ", updateData)).rejects.toThrow("Group ID is required");

      expect(mockGroupRepository.getGroupById).not.toHaveBeenCalled();
      expect(mockGroupRepository.updateGroup).not.toHaveBeenCalled();
    });

    it("should throw error if group not found", async () => {
      const updateData: UpdateGroupRequest = {
        name: "Updated Group Name",
      };

      mockGroupRepository.getGroupById.mockResolvedValue(null);

      await expect(updateGroupUseCase.execute("group-999", updateData)).rejects.toThrow("Group not found");

      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-999");
      expect(mockGroupRepository.updateGroup).not.toHaveBeenCalled();
    });

    it("should throw error if group name is empty", async () => {
      const updateData: UpdateGroupRequest = {
        name: "   ",
      };

      mockGroupRepository.getGroupById.mockResolvedValue(mockGroup);

      await expect(updateGroupUseCase.execute("group-1", updateData)).rejects.toThrow("Group name cannot be empty");

      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-1");
      expect(mockGroupRepository.updateGroup).not.toHaveBeenCalled();
    });
  });
});
