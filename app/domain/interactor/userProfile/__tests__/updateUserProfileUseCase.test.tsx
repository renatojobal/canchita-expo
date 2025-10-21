import { UpdateUserProfileUseCase } from "../updateUserProfileUseCase";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../../entities/UserProfile";
import { UpdateUserProfileRequest } from "../interfaces/IUpdateUserProfileUseCase";

describe("UpdateUserProfileUseCase", () => {
  let updateUserProfileUseCase: UpdateUserProfileUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      createUserProfile: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      verifyUserProfile: jest.fn(),
    };

    updateUserProfileUseCase = new UpdateUserProfileUseCase(mockUserRepository);
  });

  describe("execute", () => {
    const mockUserProfile: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      is_verified: false,
      isActive: true,
      created_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedUserProfile: UserProfile = {
      ...mockUserProfile,
      name: "Updated Name",
    };

    it("should update user profile successfully", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "Updated Name",
      };

      mockUserRepository.getUserById.mockResolvedValue(mockUserProfile);
      mockUserRepository.updateUser.mockResolvedValue(updatedUserProfile);

      const result = await updateUserProfileUseCase.execute("1", updateData);

      expect(result).toEqual(updatedUserProfile);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith("1", updateData);
    });

    it("should throw error if ID is empty", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "Updated Name",
      };

      await expect(updateUserProfileUseCase.execute("   ", updateData)).rejects.toThrow(
        "User profile ID is required"
      );

      expect(mockUserRepository.getUserById).not.toHaveBeenCalled();
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it("should throw error if user profile not found", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "Updated Name",
      };

      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(updateUserProfileUseCase.execute("999", updateData)).rejects.toThrow("User profile not found");

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("999");
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it("should throw error if name is empty", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "   ",
      };

      mockUserRepository.getUserById.mockResolvedValue(mockUserProfile);

      await expect(updateUserProfileUseCase.execute("1", updateData)).rejects.toThrow("Name cannot be empty");

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });
  });
});
