import { CreateGroupUseCase } from "../createGroupUseCase";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { IUserProfileRepository } from "../../../repository/userProfile/IUserProfileRepository";
import { Group } from "../../../entities/Group";
import { UserProfile } from "../../../entities/UserProfile";
import { CreateGroupRequest } from "../interfaces/ICreateGroupUseCase";

describe("CreateGroupUseCase", () => {
  let createGroupUseCase: CreateGroupUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    mockUserProfileRepository = {
      createUserProfile: jest.fn(),
      getUserProfileById: jest.fn(),
      getUserProfileByEmail: jest.fn(),
      updateUserProfile: jest.fn(),
      deleteUserProfile: jest.fn(),
      verifyUserProfile: jest.fn(),
    };

    createGroupUseCase = new CreateGroupUseCase(mockGroupRepository, mockUserProfileRepository);
  });

  describe("execute", () => {
    const mockUserProfile: UserProfile = {
      id: "user-1",
      email: "owner@example.com",
      name: "Owner User",
      is_verified: true,
      created_at: new Date(),
    };

    const validGroupData: CreateGroupRequest = {
      name: "Test Group",
      owner_profile_id: "user-1",
    };

    const mockGroup: Group = {
      id: "group-1",
      name: "Test Group",
      owner_profile_id: "user-1",
      created_at: new Date(),
    };

    it("should create group successfully with valid data", async () => {
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);
      mockGroupRepository.createGroup.mockResolvedValue(mockGroup);

      const result = await createGroupUseCase.execute(validGroupData);

      expect(result).toEqual(mockGroup);
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith(validGroupData.owner_profile_id);
      expect(mockGroupRepository.createGroup).toHaveBeenCalledWith(validGroupData);
    });

    it("should throw error if group name is empty", async () => {
      const invalidGroupData: CreateGroupRequest = {
        name: "   ",
        owner_profile_id: "user-1",
      };

      await expect(createGroupUseCase.execute(invalidGroupData)).rejects.toThrow("Group name is required");

      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockGroupRepository.createGroup).not.toHaveBeenCalled();
    });

    it("should throw error if owner profile ID is empty", async () => {
      const invalidGroupData: CreateGroupRequest = {
        name: "Test Group",
        owner_profile_id: "   ",
      };

      await expect(createGroupUseCase.execute(invalidGroupData)).rejects.toThrow("Owner profile ID is required");

      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockGroupRepository.createGroup).not.toHaveBeenCalled();
    });

    it("should throw error if owner profile not found", async () => {
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(null);

      await expect(createGroupUseCase.execute(validGroupData)).rejects.toThrow("Owner profile not found");

      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith(validGroupData.owner_profile_id);
      expect(mockGroupRepository.createGroup).not.toHaveBeenCalled();
    });
  });
});
