import { CreateUserUseCase } from "../createUserUseCase";
import { IUserRepository } from "../../../repository/login/IUserRepository";
import { AuthResponse } from "../../entities/AuthResponse";
import { User } from "../../entities/User";
import { CreateUserRequest } from "../interfaces/ICreateUserUseCase";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      createUser: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      refreshToken: jest.fn(),
      validateToken: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockUserRepository);
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
      } as User,
    };

    it("should create a user successfully with valid data", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);
      mockUserRepository.createUser.mockResolvedValue(mockAuthResponse);

      const result = await createUserUseCase.execute(validUserData);

      expect(result).toEqual(mockAuthResponse);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(
        validUserData.email
      );
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(validUserData);
    });

    it("should throw error if user already exists", async () => {
      const existingUser: User = {
        id: "1",
        email: "test@example.com",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        isActive: true,
      } as User;

      mockUserRepository.getUserById.mockResolvedValue(existingUser);

      await expect(createUserUseCase.execute(validUserData)).rejects.toThrow(
        "User with this email already exists"
      );

      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if email format is invalid", async () => {
      const invalidEmailData: CreateUserRequest = {
        ...validUserData,
        email: "invalid-email",
      };

      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(createUserUseCase.execute(invalidEmailData)).rejects.toThrow(
        "Invalid email format"
      );

      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if password is less than 8 characters", async () => {
      const shortPasswordData: CreateUserRequest = {
        ...validUserData,
        password: "short",
      };

      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(shortPasswordData)
      ).rejects.toThrow("Password must be at least 8 characters long");

      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if username is empty", async () => {
      const emptyUsernameData: CreateUserRequest = {
        ...validUserData,
        username: "   ",
      };

      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(emptyUsernameData)
      ).rejects.toThrow("Username is required");

      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if firstName is empty", async () => {
      const emptyFirstNameData: CreateUserRequest = {
        ...validUserData,
        firstName: "   ",
      };

      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(emptyFirstNameData)
      ).rejects.toThrow("First name and last name are required");

      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw error if lastName is empty", async () => {
      const emptyLastNameData: CreateUserRequest = {
        ...validUserData,
        lastName: "   ",
      };

      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(
        createUserUseCase.execute(emptyLastNameData)
      ).rejects.toThrow("First name and last name are required");

      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });
  });
});
