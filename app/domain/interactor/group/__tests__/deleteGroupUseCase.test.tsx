import { DeleteGroupUseCase } from "../deleteGroupUseCase";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { Group } from "../../../entities/Group";

describe("DeleteGroupUseCase", () => {
  let deleteGroupUseCase: DeleteGroupUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    deleteGroupUseCase = new DeleteGroupUseCase(mockGroupRepository);
  });

  describe("execute", () => {
    const mockGroup: Group = {
      id: "group-1",
      name: "Test Group",
      owner_profile_id: "user-1",
      created_at: new Date(),
    };

    it("should delete group successfully", async () => {
      mockGroupRepository.getGroupById.mockResolvedValue(mockGroup);
      mockGroupRepository.deleteGroup.mockResolvedValue(undefined);

      await deleteGroupUseCase.execute("group-1");

      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-1");
      expect(mockGroupRepository.deleteGroup).toHaveBeenCalledWith("group-1");
    });

    it("should throw error if ID is empty", async () => {
      await expect(deleteGroupUseCase.execute("   ")).rejects.toThrow("Group ID is required");

      expect(mockGroupRepository.getGroupById).not.toHaveBeenCalled();
      expect(mockGroupRepository.deleteGroup).not.toHaveBeenCalled();
    });

    it("should throw error if group not found", async () => {
      mockGroupRepository.getGroupById.mockResolvedValue(null);

      await expect(deleteGroupUseCase.execute("group-999")).rejects.toThrow("Group not found");

      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-999");
      expect(mockGroupRepository.deleteGroup).not.toHaveBeenCalled();
    });
  });
});
