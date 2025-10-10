import { GetGroupUseCase } from "../getGroupUseCase";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { Group } from "../../../entities/Group";

describe("GetGroupUseCase", () => {
  let getGroupUseCase: GetGroupUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    getGroupUseCase = new GetGroupUseCase(mockGroupRepository);
  });

  describe("execute", () => {
    const mockGroup: Group = {
      id: "group-1",
      name: "Test Group",
      owner_profile_id: "user-1",
      created_at: new Date(),
    };

    it("should get group successfully with valid ID", async () => {
      mockGroupRepository.getGroupById.mockResolvedValue(mockGroup);

      const result = await getGroupUseCase.execute("group-1");

      expect(result).toEqual(mockGroup);
      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-1");
    });

    it("should return null if group not found", async () => {
      mockGroupRepository.getGroupById.mockResolvedValue(null);

      const result = await getGroupUseCase.execute("group-999");

      expect(result).toBeNull();
      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith("group-999");
    });

    it("should throw error if ID is empty", async () => {
      await expect(getGroupUseCase.execute("   ")).rejects.toThrow("Group ID is required");

      expect(mockGroupRepository.getGroupById).not.toHaveBeenCalled();
    });
  });
});
