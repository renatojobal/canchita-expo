import { RefreshTokenUseCase } from '../refreshTokenUseCase';
import { IUserRepository } from '../../repositories/IUserRepository';
import { AuthResponse } from '../../entities/AuthResponse';
import { User } from '../../entities/User';

describe('RefreshTokenUseCase', () => {
  let refreshTokenUseCase: RefreshTokenUseCase;
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

    refreshTokenUseCase = new RefreshTokenUseCase(mockUserRepository);
  });

  describe('execute', () => {
    const validRefreshToken = 'valid-refresh-token';

    const mockAuthResponse: AuthResponse = {
      token: 'new-token',
      refreshToken: 'new-refresh-token',
      user: {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        isActive: true,
      } as User,
    };

    it('should refresh token successfully with valid refresh token', async () => {
      mockUserRepository.refreshToken.mockResolvedValue(mockAuthResponse);

      const result = await refreshTokenUseCase.execute(validRefreshToken);

      expect(result).toEqual(mockAuthResponse);
      expect(mockUserRepository.refreshToken).toHaveBeenCalledWith(validRefreshToken);
    });

    it('should throw error if refresh token is empty', async () => {
      await expect(refreshTokenUseCase.execute('   ')).rejects.toThrow(
        'Refresh token is required'
      );

      expect(mockUserRepository.refreshToken).not.toHaveBeenCalled();
    });

    it('should throw error if refresh token is invalid or expired', async () => {
      mockUserRepository.refreshToken.mockRejectedValue(new Error('Token expired'));

      await expect(refreshTokenUseCase.execute('invalid-token')).rejects.toThrow(
        'Invalid or expired refresh token'
      );

      expect(mockUserRepository.refreshToken).toHaveBeenCalledWith('invalid-token');
    });
  });
});
