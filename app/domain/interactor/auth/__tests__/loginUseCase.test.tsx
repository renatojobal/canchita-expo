import { LoginUseCase } from "../loginUseCase";
import { IUserRepository } from "../../../repository/login/IUserRepository";
import { User } from "../../entities/User";
import { LoginRequest } from "../interfaces/ILoginUseCase";
import { AuthResponse } from "../../entities/AuthResponse";

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
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

    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  describe("execute", () => {
    const validCredentials: LoginRequest = {
      email: "test@example.com",
      password: "password123",
    };

    const mockUser: User = {
      id: "1",
      email: "test@example.com",
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      isActive: true,
    } as User;

    const mockAuthResponse: AuthResponse = {
      token: "mock-token",
      refreshToken: "mock-refresh-token",
      user: mockUser,
    };

    it("should login successfully with valid credentials", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);
      mockUserRepository.login.mockResolvedValue(mockAuthResponse);

      const result = await loginUseCase.execute(validCredentials);

      expect(result).toEqual(mockAuthResponse);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        validCredentials.email
      );
      expect(mockUserRepository.login).toHaveBeenCalledWith(validCredentials);
    });

    it("should throw error if email format is invalid", async () => {
      const invalidEmailCredentials: LoginRequest = {
        email: "invalid-email",
        password: "password123",
      };

      await expect(
        loginUseCase.execute(invalidEmailCredentials)
      ).rejects.toThrow("Invalid email format");

      expect(mockUserRepository.getUserByEmail).not.toHaveBeenCalled();
      expect(mockUserRepository.login).not.toHaveBeenCalled();
    });

    it("should throw error if password is empty", async () => {
      const emptyPasswordCredentials: LoginRequest = {
        email: "test@example.com",
        password: "   ",
      };

      await expect(
        loginUseCase.execute(emptyPasswordCredentials)
      ).rejects.toThrow("Password is required");

      expect(mockUserRepository.getUserByEmail).not.toHaveBeenCalled();
      expect(mockUserRepository.login).not.toHaveBeenCalled();
    });

    it("should throw error if user does not exist", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(loginUseCase.execute(validCredentials)).rejects.toThrow(
        "Invalid email or password"
      );

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        validCredentials.email
      );
      expect(mockUserRepository.login).not.toHaveBeenCalled();
    });

    it("should throw error if account is deactivated", async () => {
      const inactiveUser: User = {
        ...mockUser,
        isActive: false,
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(inactiveUser);

      await expect(loginUseCase.execute(validCredentials)).rejects.toThrow(
        "Account is deactivated"
      );

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        validCredentials.email
      );
      expect(mockUserRepository.login).not.toHaveBeenCalled();
    });
  });
});
