import { GetGroupsByOwnerUseCase } from "../getGroupsByOwnerUseCase";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { Group } from "../../../entities/Group";

describe("GetGroupsByOwnerUseCase", () => {
  let getGroupsByOwnerUseCase: GetGroupsByOwnerUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    getGroupsByOwnerUseCase = new GetGroupsByOwnerUseCase(mockGroupRepository);
  });

  describe("execute", () => {
    const mockGroups: Group[] = [
      {
        id: "group-1",
        name: "Test Group 1",
        owner_profile_id: "user-1",
        created_at: new Date(),
      },
      {
        id: "group-2",
        name: "Test Group 2",
        owner_profile_id: "user-1",
        created_at: new Date(),
      },
    ];

    it("should get groups by owner successfully", async () => {
      mockGroupRepository.getGroupsByOwner.mockResolvedValue(mockGroups);

      const result = await getGroupsByOwnerUseCase.execute("user-1");

      expect(result).toEqual(mockGroups);
      expect(mockGroupRepository.getGroupsByOwner).toHaveBeenCalledWith("user-1");
    });

    it("should return empty array if no groups found", async () => {
      mockGroupRepository.getGroupsByOwner.mockResolvedValue([]);

      const result = await getGroupsByOwnerUseCase.execute("user-999");

      expect(result).toEqual([]);
      expect(mockGroupRepository.getGroupsByOwner).toHaveBeenCalledWith("user-999");
    });

    it("should throw error if owner profile ID is empty", async () => {
      await expect(getGroupsByOwnerUseCase.execute("   ")).rejects.toThrow("Owner profile ID is required");

      expect(mockGroupRepository.getGroupsByOwner).not.toHaveBeenCalled();
    });
  });
});
