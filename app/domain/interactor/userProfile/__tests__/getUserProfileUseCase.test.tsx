import { GetUserProfileUseCase } from "../getUserProfileUseCase";
import { IUserProfileRepository } from "../../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../../entities/UserProfile";

describe("GetUserProfileUseCase", () => {
  let getUserProfileUseCase: GetUserProfileUseCase;
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

    getUserProfileUseCase = new GetUserProfileUseCase(mockUserProfileRepository);
  });

  describe("execute", () => {
    const mockUserProfile: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      is_verified: false,
      created_at: new Date(),
    };

    it("should get user profile successfully with valid ID", async () => {
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);

      const result = await getUserProfileUseCase.execute("1");

      expect(result).toEqual(mockUserProfile);
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("1");
    });

    it("should return null if user profile not found", async () => {
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(null);

      const result = await getUserProfileUseCase.execute("999");

      expect(result).toBeNull();
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("999");
    });

    it("should throw error if ID is empty", async () => {
      await expect(getUserProfileUseCase.execute("   ")).rejects.toThrow("User profile ID is required");

      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
    });
  });
});
