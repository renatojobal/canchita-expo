import { RefreshTokenUseCase } from "../refreshTokenUseCase";
import { AuthRepository } from "../../../repository/auth/IAuthRepository";
import { AuthResponse } from "../../../entities/Session";
import { User } from "../../../entities/User";

describe("RefreshTokenUseCase", () => {
  let refreshTokenUseCase: RefreshTokenUseCase;
  let mockAuthRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      createUser: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
      validateToken: jest.fn(),
    };

    refreshTokenUseCase = new RefreshTokenUseCase(mockAuthRepository);
  });

  describe("execute", () => {
    const validRefreshToken = "valid-refresh-token";

    const mockAuthResponse: AuthResponse = {
      token: "new-token",
      refreshToken: "new-refresh-token",
      user: {
        id: "1",
        email: "test@example.com",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        isActive: true,
      } as User,
    };

    it("should refresh token successfully with valid refresh token", async () => {
      mockAuthRepository.refreshToken.mockResolvedValue(mockAuthResponse);

      const result = await refreshTokenUseCase.execute(validRefreshToken);

      expect(result).toEqual(mockAuthResponse);
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(
        validRefreshToken
      );
    });

    it("should throw error if refresh token is empty", async () => {
      await expect(refreshTokenUseCase.execute("   ")).rejects.toThrow(
        "Refresh token is required"
      );

      expect(mockAuthRepository.refreshToken).not.toHaveBeenCalled();
    });

    it("should throw error if refresh token is invalid or expired", async () => {
      mockAuthRepository.refreshToken.mockRejectedValue(
        new Error("Token expired")
      );

      await expect(
        refreshTokenUseCase.execute("invalid-token")
      ).rejects.toThrow("Invalid or expired refresh token");

      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(
        "invalid-token"
      );
    });
  });
});
