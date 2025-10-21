import { VerifyUserProfileUseCase } from "../verifyUserProfileUseCase";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../../entities/UserProfile";

describe("VerifyUserProfileUseCase", () => {
  let verifyUserProfileUseCase: VerifyUserProfileUseCase;
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

    verifyUserProfileUseCase = new VerifyUserProfileUseCase(mockUserRepository);
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

    const verifiedUserProfile: UserProfile = {
      ...mockUserProfile,
      is_verified: true,
    };

    it("should verify user profile successfully", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUserProfile);
      mockUserRepository.verifyUserProfile.mockResolvedValue(verifiedUserProfile);

      const result = await verifyUserProfileUseCase.execute("1");

      expect(result).toEqual(verifiedUserProfile);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
      expect(mockUserRepository.verifyUserProfile).toHaveBeenCalledWith("1");
    });

    it("should throw error if ID is empty", async () => {
      await expect(verifyUserProfileUseCase.execute("   ")).rejects.toThrow("User profile ID is required");

      expect(mockUserRepository.getUserById).not.toHaveBeenCalled();
      expect(mockUserRepository.verifyUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(verifyUserProfileUseCase.execute("999")).rejects.toThrow("User profile not found");

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("999");
      expect(mockUserRepository.verifyUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile is already verified", async () => {
      const alreadyVerified: UserProfile = {
        ...mockUserProfile,
        is_verified: true,
      };

      mockUserRepository.getUserById.mockResolvedValue(alreadyVerified);

      await expect(verifyUserProfileUseCase.execute("1")).rejects.toThrow("User profile is already verified");

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
      expect(mockUserRepository.verifyUserProfile).not.toHaveBeenCalled();
    });
  });
});
