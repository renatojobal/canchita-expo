import { VerifyUserProfileUseCase } from "../verifyUserProfileUseCase";
import { IUserProfileRepository } from "../../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../../entities/UserProfile";

describe("VerifyUserProfileUseCase", () => {
  let verifyUserProfileUseCase: VerifyUserProfileUseCase;
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

    verifyUserProfileUseCase = new VerifyUserProfileUseCase(mockUserProfileRepository);
  });

  describe("execute", () => {
    const mockUserProfile: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      is_verified: false,
      created_at: new Date(),
    };

    const verifiedUserProfile: UserProfile = {
      ...mockUserProfile,
      is_verified: true,
    };

    it("should verify user profile successfully", async () => {
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);
      mockUserProfileRepository.verifyUserProfile.mockResolvedValue(verifiedUserProfile);

      const result = await verifyUserProfileUseCase.execute("1");

      expect(result).toEqual(verifiedUserProfile);
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("1");
      expect(mockUserProfileRepository.verifyUserProfile).toHaveBeenCalledWith("1");
    });

    it("should throw error if ID is empty", async () => {
      await expect(verifyUserProfileUseCase.execute("   ")).rejects.toThrow("User profile ID is required");

      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockUserProfileRepository.verifyUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile not found", async () => {
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(null);

      await expect(verifyUserProfileUseCase.execute("999")).rejects.toThrow("User profile not found");

      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("999");
      expect(mockUserProfileRepository.verifyUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile is already verified", async () => {
      const alreadyVerified: UserProfile = {
        ...mockUserProfile,
        is_verified: true,
      };

      mockUserProfileRepository.getUserProfileById.mockResolvedValue(alreadyVerified);

      await expect(verifyUserProfileUseCase.execute("1")).rejects.toThrow("User profile is already verified");

      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("1");
      expect(mockUserProfileRepository.verifyUserProfile).not.toHaveBeenCalled();
    });
  });
});
