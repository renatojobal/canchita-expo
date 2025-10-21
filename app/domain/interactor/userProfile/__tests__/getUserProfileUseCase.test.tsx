import { GetUserProfileUseCase } from "../getUserProfileUseCase";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../../entities/UserProfile";

describe("GetUserProfileUseCase", () => {
  let getUserProfileUseCase: GetUserProfileUseCase;
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

    getUserProfileUseCase = new GetUserProfileUseCase(mockUserRepository);
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

    it("should get user profile successfully with valid ID", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUserProfile);

      const result = await getUserProfileUseCase.execute("1");

      expect(result).toEqual(mockUserProfile);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
    });

    it("should return null if user profile not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      const result = await getUserProfileUseCase.execute("999");

      expect(result).toBeNull();
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("999");
    });

    it("should throw error if ID is empty", async () => {
      await expect(getUserProfileUseCase.execute("   ")).rejects.toThrow("User profile ID is required");

      expect(mockUserRepository.getUserById).not.toHaveBeenCalled();
    });
  });
});
