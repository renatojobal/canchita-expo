import { CreateUserProfileUseCase } from "../createUserProfileUseCase";
import { IUserProfileRepository } from "../../../repository/userProfile/IUserProfileRepository";
import { UserProfile } from "../../../entities/UserProfile";
import { CreateUserProfileRequest } from "../interfaces/ICreateUserProfileUseCase";

describe("CreateUserProfileUseCase", () => {
  let createUserProfileUseCase: CreateUserProfileUseCase;
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

    createUserProfileUseCase = new CreateUserProfileUseCase(mockUserProfileRepository);
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
      photo_url: "https://example.com/photo.jpg",
      is_verified: false,
      created_at: new Date(),
    };

    it("should create user profile successfully with valid data", async () => {
      mockUserProfileRepository.getUserProfileByEmail.mockResolvedValue(null);
      mockUserProfileRepository.createUserProfile.mockResolvedValue(mockUserProfile);

      const result = await createUserProfileUseCase.execute(validUserData);

      expect(result).toEqual(mockUserProfile);
      expect(mockUserProfileRepository.getUserProfileByEmail).toHaveBeenCalledWith(validUserData.email);
      expect(mockUserProfileRepository.createUserProfile).toHaveBeenCalledWith(validUserData);
    });

    it("should throw error if email format is invalid", async () => {
      const invalidEmailData: CreateUserProfileRequest = {
        email: "invalid-email",
        name: "Test User",
      };

      await expect(createUserProfileUseCase.execute(invalidEmailData)).rejects.toThrow("Invalid email format");

      expect(mockUserProfileRepository.getUserProfileByEmail).not.toHaveBeenCalled();
      expect(mockUserProfileRepository.createUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if name is empty", async () => {
      const emptyNameData: CreateUserProfileRequest = {
        email: "test@example.com",
        name: "   ",
      };

      await expect(createUserProfileUseCase.execute(emptyNameData)).rejects.toThrow("Name is required");

      expect(mockUserProfileRepository.getUserProfileByEmail).not.toHaveBeenCalled();
      expect(mockUserProfileRepository.createUserProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile with email already exists", async () => {
      mockUserProfileRepository.getUserProfileByEmail.mockResolvedValue(mockUserProfile);

      await expect(createUserProfileUseCase.execute(validUserData)).rejects.toThrow(
        "User profile with this email already exists"
      );

      expect(mockUserProfileRepository.getUserProfileByEmail).toHaveBeenCalledWith(validUserData.email);
      expect(mockUserProfileRepository.createUserProfile).not.toHaveBeenCalled();
    });
  });
});
