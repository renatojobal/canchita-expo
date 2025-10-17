import api from "../../provider/axiosClient";
import { CreateUserRequest } from "../../../domain/interactor/auth/interfaces/ICreateUserUseCase";
import { LoginRequest } from "../../../domain/interactor/auth/interfaces/ILoginUseCase";
import { AuthResponse } from "../../../domain/entities/Session";
import { UserRepository } from "./UserRepository";

jest.mock("../../provider/axiosClient"); // mockeamos axiosClient

describe("UserRepository", () => {
  let userRepository: UserRepository;
  const mockedApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    const createUserDto: CreateUserRequest = {
      email: "test@example.com",
      password: "password123",
      firstName: "Test",
      lastName: "User",
      username: "testuser999"
    };

    it("should return AuthResponse on successful signup", async () => {
      const mockResponse = {
        data: {
          user: { id: "1", name: "Test User", email: "test@example.com" },
          access_token: "token123",
          refresh_token: "refresh123",
        },
      };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result: AuthResponse = await userRepository.createUser(createUserDto);

      expect(result.user.firstName).toBe("Test");
      expect(result.user.lastName).toBe("User");
      expect(result.token).toBe("token123");
      expect(result.refreshToken).toBe("refresh123");
      expect(mockedApi.post).toHaveBeenCalledWith("/auth/signup", {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });
    });

    it("should throw if API rejects", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(userRepository.createUser(createUserDto)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("login", () => {
    const loginDto: LoginRequest = {
      email: "test@example.com",
      password: "password123",
    };

    it("should return AuthResponse on successful login", async () => {
      const mockResponse = {
        data: {
          user: { id: "1", name: "Test User", email: "test@example.com" },
          access_token: "token123",
          refresh_token: "refresh123",
        },
      };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result: AuthResponse = await userRepository.login(loginDto);

      expect(result.user.firstName).toBe("Test");
      expect(result.token).toBe("token123");
      expect(mockedApi.post).toHaveBeenCalledWith("/auth/login", { credentials: loginDto });
    });

    it("should throw if API rejects", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(userRepository.login(loginDto)).rejects.toThrow("Network error");
    });
  });

  describe("logout", () => {
    it("should call API with refresh token", async () => {
      mockedApi.post.mockResolvedValueOnce({}); // logout no retorna datos

      await userRepository.logout("refresh123");

      expect(mockedApi.post).toHaveBeenCalledWith("/auth/logout", { refresh_token: "refresh123" });
    });

    it("should throw if API rejects", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(userRepository.logout("refresh123")).rejects.toThrow("Network error");
    });
  });

  describe("refreshToken", () => {
    it("should return AuthResponse on token refresh", async () => {
      const mockResponse = {
        data: {
          user: { id: "1", name: "Test User", email: "test@example.com" },
          access_token: "new-token",
          refresh_token: "new-refresh",
        },
      };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await userRepository.refreshToken("refresh123");

      expect(result.token).toBe("new-token");
      expect(result.refreshToken).toBe("new-refresh");
      expect(mockedApi.post).toHaveBeenCalledWith("/auth/refresh", { refresh_token: "refresh123" });
    });

    it("should throw if API rejects", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(userRepository.refreshToken("refresh123")).rejects.toThrow("Network error");
    });
  });
});
