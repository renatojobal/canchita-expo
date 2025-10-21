import { CreateGroupUseCase } from "../createGroupUseCase";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { Group } from "../../../entities/Group";
import { UserProfile } from "../../../entities/UserProfile";
import { CreateGroupRequest } from "../interfaces/ICreateGroupUseCase";

describe("CreateGroupUseCase", () => {
  let createGroupUseCase: CreateGroupUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    mockUserRepository = {
      createUserProfile: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      verifyUserProfile: jest.fn(),
    };

    createGroupUseCase = new CreateGroupUseCase(mockGroupRepository, mockUserRepository);
  });

  describe("execute", () => {
    const mockUserProfile: UserProfile = {
      id: "user-1",
      email: "owner@example.com",
      name: "Owner User",
      username: "owneruser",
      firstName: "Owner",
      lastName: "User",
      is_verified: true,
      isActive: true,
      created_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
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
      mockUserRepository.getUserById.mockResolvedValue(mockUserProfile);
      mockGroupRepository.createGroup.mockResolvedValue(mockGroup);

      const result = await createGroupUseCase.execute(validGroupData);

      expect(result).toEqual(mockGroup);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(validGroupData.owner_profile_id);
      expect(mockGroupRepository.createGroup).toHaveBeenCalledWith(validGroupData);
    });

    it("should throw error if group name is empty", async () => {
      const invalidGroupData: CreateGroupRequest = {
        name: "   ",
        owner_profile_id: "user-1",
      };

      await expect(createGroupUseCase.execute(invalidGroupData)).rejects.toThrow("Group name is required");

      expect(mockUserRepository.getUserById).not.toHaveBeenCalled();
      expect(mockGroupRepository.createGroup).not.toHaveBeenCalled();
    });

    it("should throw error if owner profile ID is empty", async () => {
      const invalidGroupData: CreateGroupRequest = {
        name: "Test Group",
        owner_profile_id: "   ",
      };

      await expect(createGroupUseCase.execute(invalidGroupData)).rejects.toThrow("Owner profile ID is required");

      expect(mockUserRepository.getUserById).not.toHaveBeenCalled();
      expect(mockGroupRepository.createGroup).not.toHaveBeenCalled();
    });

    it("should throw error if owner profile not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(createGroupUseCase.execute(validGroupData)).rejects.toThrow("Owner profile not found");

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(validGroupData.owner_profile_id);
      expect(mockGroupRepository.createGroup).not.toHaveBeenCalled();
    });
  });
});
