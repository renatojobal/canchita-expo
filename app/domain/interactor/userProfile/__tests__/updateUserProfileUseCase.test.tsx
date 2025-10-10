import { UpdateUserProfileUseCase } from "../updateUserProfileUseCase";
import { IUserProfileRepository } from "../../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../../entities/UserProfile";
import { UpdateUserProfileRequest } from "../interfaces/IUpdateUserProfileUseCase";

describe("UpdateUserProfileUseCase", () => {
  let updateUserProfileUseCase: UpdateUserProfileUseCase;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockUserProfileRepository = {
      createUserProfile: jest.fn(),
      getUserProfileById: jest.fn(),
      getUserProfileByEmail: jest.fn(),
      updateUserProfile: jest.fn(),
      deleteUserProfile: jest.fn(),
      verifyUserProfile: jest.fn(),
    };

    updateUserProfileUseCase = new UpdateUserProfileUseCase(mockUserProfileRepository);
  });

  describe("execute", () => {
    const mockUserProfile: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      is_verified: false,
      created_at: new Date(),
    };

    const updatedUserProfile: UserProfile = {
      ...mockUserProfile,
      name: "Updated Name",
    };

    it("should update user profile successfully", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "Updated Name",
      };

      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);
      mockUserProfileRepository.updateUserProfile.mockResolvedValue(updatedUserProfile);

      const result = await updateUserProfileUseCase.execute("1", updateData);

      expect(result).toEqual(updatedUserProfile);
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("1");
      expect(mockUserProfileRepository.updateUserProfile).toHaveBeenCalledWith("1", updateData);
    });

    it("should throw error if ID is empty", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "Updated Name",
      };

      await expect(updateUserProfileUseCase.execute("   ", updateData)).rejects.toThrow(
        "User profile ID is required"
      );

      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockUserProfileRepository.updateUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile not found", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "Updated Name",
      };

      mockUserProfileRepository.getUserProfileById.mockResolvedValue(null);

      await expect(updateUserProfileUseCase.execute("999", updateData)).rejects.toThrow("User profile not found");

      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("999");
      expect(mockUserProfileRepository.updateUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if name is empty", async () => {
      const updateData: UpdateUserProfileRequest = {
        name: "   ",
      };

      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);

      await expect(updateUserProfileUseCase.execute("1", updateData)).rejects.toThrow("Name cannot be empty");

      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("1");
      expect(mockUserProfileRepository.updateUserProfile).not.toHaveBeenCalled();
    });
  });
});
