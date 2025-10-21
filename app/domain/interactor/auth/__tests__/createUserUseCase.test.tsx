import { CreateUserUseCase } from "../createUserUseCase";
import { IUserRepository } from "../../../repository/userProfile/IUserRepository";
import { AuthRepository } from "../../../repository/auth/IAuthRepository";
import { AuthResponse } from "../../../entities/Session";
import { UserProfile } from "../../../entities/UserProfile";
import { CreateUserRequest } from "../interfaces/ICreateUserUseCase";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let mockAuthRepository: jest.Mocked<AuthRepository>;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      createUser: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
      validateToken: jest.fn(),
    };

    mockUserRepository = {
      createUserProfile: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      verifyUserProfile: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockAuthRepository, mockUserRepository);
  });

  describe("execute", () => {
    const validUserData: CreateUserRequest = {
      email: "test@example.com",
      password: "password123",
      username: "testuser",
      firstName: "Test",
      lastName: "User",
    };

    const mockAuthResponse: AuthResponse = {
      token: "mock-token",
      refreshToken: "mock-refresh-token",
      user: {
        id: "1",
        email: "test@example.com",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        isActive: true,
      } as UserProfile,
    };

    it("should create a user successfully with valid data", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);
      mockAuthRepository.createUser.mockResolvedValue(mockAuthResponse);

      const result = await createUserUseCase.execute(validUserData);

      expect(result).toEqual(mockAuthResponse);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        validUserData.email
      );
      expect(mockAuthRepository.createUser).toHaveBeenCalledWith(validUserData);
    });

    it("should throw error if user already exists", async () => {
      const existingUser: UserProfile = {
        id: "1",
        email: "test@example.com",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        isActive: true,
      } as UserProfile;

      mockUserRepository.getUserByEmail.mockResolvedValue(existingUser);

      await expect(createUserUseCase.execute(validUserData)).rejects.toThrow(
        "User with this email already exists"
      );

      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if email format is invalid", async () => {
      const invalidEmailData: CreateUserRequest = {
        ...validUserData,
        email: "invalid-email",
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(createUserUseCase.execute(invalidEmailData)).rejects.toThrow(
        "Invalid email format"
      );

      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if password is less than 8 characters", async () => {
      const shortPasswordData: CreateUserRequest = {
        ...validUserData,
        password: "short",
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(shortPasswordData)
      ).rejects.toThrow("Password must be at least 8 characters long");

      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if username is empty", async () => {
      const emptyUsernameData: CreateUserRequest = {
        ...validUserData,
        username: "   ",
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(emptyUsernameData)
      ).rejects.toThrow("Username is required");

      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if firstName is empty", async () => {
      const emptyFirstNameData: CreateUserRequest = {
        ...validUserData,
        firstName: "   ",
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(emptyFirstNameData)
      ).rejects.toThrow("First name and last name are required");

      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if lastName is empty", async () => {
      const emptyLastNameData: CreateUserRequest = {
        ...validUserData,
        lastName: "   ",
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(emptyLastNameData)
      ).rejects.toThrow("First name and last name are required");

      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });
  });
});
