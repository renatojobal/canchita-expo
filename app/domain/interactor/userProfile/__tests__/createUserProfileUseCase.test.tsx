import { CreateUserProfileUseCase } from "../createUserProfileUseCase";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { UserProfile } from "../../../entities/UserProfile";
import { CreateUserProfileRequest } from "../interfaces/ICreateUserProfileUseCase";

describe("CreateUserProfileUseCase", () => {
  let createUserProfileUseCase: CreateUserProfileUseCase;
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

    createUserProfileUseCase = new CreateUserProfileUseCase(mockUserRepository);
  });

  describe("execute", () => {
    const validUserData: CreateUserProfileRequest = {
      email: "test@example.com",
      name: "Test User",
      photo_url: "https://example.com/photo.jpg",
    };

    const mockUserProfile: UserProfile = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      photo_url: "https://example.com/photo.jpg",
      is_verified: false,
      isActive: true,
      created_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it("should create user profile successfully with valid data", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);
      mockUserRepository.createUserProfile.mockResolvedValue(mockUserProfile);

      const result = await createUserProfileUseCase.execute(validUserData);

      expect(result).toEqual(mockUserProfile);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(validUserData.email);
      expect(mockUserRepository.createUserProfile).toHaveBeenCalledWith(validUserData);
    });

    it("should throw error if email format is invalid", async () => {
      const invalidEmailData: CreateUserProfileRequest = {
        email: "invalid-email",
        name: "Test User",
      };

      await expect(createUserProfileUseCase.execute(invalidEmailData)).rejects.toThrow("Invalid email format");

      expect(mockUserRepository.getUserByEmail).not.toHaveBeenCalled();
      expect(mockUserRepository.createUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if name is empty", async () => {
      const emptyNameData: CreateUserProfileRequest = {
        email: "test@example.com",
        name: "   ",
      };

      await expect(createUserProfileUseCase.execute(emptyNameData)).rejects.toThrow("Name is required");

      expect(mockUserRepository.getUserByEmail).not.toHaveBeenCalled();
      expect(mockUserRepository.createUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile with email already exists", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUserProfile);

      await expect(createUserProfileUseCase.execute(validUserData)).rejects.toThrow(
        "User profile with this email already exists"
      );

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(validUserData.email);
      expect(mockUserRepository.createUserProfile).not.toHaveBeenCalled();
    });
  });
});
