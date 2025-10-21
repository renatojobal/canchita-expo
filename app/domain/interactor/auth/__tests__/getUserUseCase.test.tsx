import { GetUserUseCase } from "../getUserUseCase";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../../entities/UserProfile";

describe("GetUserUseCase", () => {
  let getUserUseCase: GetUserUseCase;
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

    getUserUseCase = new GetUserUseCase(mockUserRepository);
  });

  describe("executeById", () => {
    const mockUser: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      isActive: true,
      is_verified: true,
      created_at: new Date(),
    } as UserProfile;

    it("should get user successfully by id", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);

      const result = await getUserUseCase.executeById("1");

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("1");
    });

    it("should throw error if user id is empty", async () => {
      await expect(getUserUseCase.executeById("   ")).rejects.toThrow(
        "User ID is required"
      );

      expect(mockUserRepository.getUserById).not.toHaveBeenCalled();
    });

    it("should throw error if user not found by id", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(getUserUseCase.executeById("999")).rejects.toThrow(
        "User not found"
      );

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith("999");
    });
  });

  describe("executeByEmail", () => {
    const mockUser: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      isActive: true,
      is_verified: true,
      created_at: new Date(),
    } as UserProfile;

    it("should get user successfully by email", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);

      const result = await getUserUseCase.executeByEmail("test@example.com");

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
    });

    it("should throw error if email is empty", async () => {
      await expect(getUserUseCase.executeByEmail("   ")).rejects.toThrow(
        "Email is required"
      );

      expect(mockUserRepository.getUserByEmail).not.toHaveBeenCalled();
    });

    it("should throw error if email format is invalid", async () => {
      await expect(
        getUserUseCase.executeByEmail("invalid-email")
      ).rejects.toThrow("Invalid email format");

      expect(mockUserRepository.getUserByEmail).not.toHaveBeenCalled();
    });

    it("should throw error if user not found by email", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        getUserUseCase.executeByEmail("notfound@example.com")
      ).rejects.toThrow("User not found");

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        "notfound@example.com"
      );
    });
  });
});
