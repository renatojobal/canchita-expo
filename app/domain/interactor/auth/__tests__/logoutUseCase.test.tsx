import { LogoutUseCase } from "../logoutUseCase";
import { AuthRepository } from "../../../repository/auth/IAuthRepository";

describe("LogoutUseCase", () => {
  let logoutUseCase: LogoutUseCase;
  let mockAuthRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      createUser: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
      validateToken: jest.fn(),
    };

    logoutUseCase = new LogoutUseCase(mockAuthRepository);
  });

  describe("execute", () => {
    const validToken = "valid-token";

    it("should logout successfully with valid token", async () => {
      mockAuthRepository.validateToken.mockResolvedValue(true);
      mockAuthRepository.logout.mockResolvedValue(undefined);

      await logoutUseCase.execute(validToken);

      expect(mockAuthRepository.validateToken).toHaveBeenCalledWith(validToken);
      expect(mockAuthRepository.logout).toHaveBeenCalledWith(validToken);
    });

    it("should throw error if token is empty", async () => {
      await expect(logoutUseCase.execute("   ")).rejects.toThrow(
        "Token is required"
      );

      expect(mockAuthRepository.validateToken).not.toHaveBeenCalled();
      expect(mockAuthRepository.logout).not.toHaveBeenCalled();
    });

    it("should throw error if token is invalid", async () => {
      mockAuthRepository.validateToken.mockResolvedValue(false);

      await expect(logoutUseCase.execute("invalid-token")).rejects.toThrow(
        "Invalid token"
      );

      expect(mockAuthRepository.validateToken).toHaveBeenCalledWith(
        "invalid-token"
      );
      expect(mockAuthRepository.logout).not.toHaveBeenCalled();
    });
  });
});
