import { LogoutUseCase } from '../logoutUseCase';
import { IUserRepository } from '../../repositories/IUserRepository';

describe('LogoutUseCase', () => {
  let logoutUseCase: LogoutUseCase;
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

    logoutUseCase = new LogoutUseCase(mockUserRepository);
  });

  describe('execute', () => {
    const validToken = 'valid-token';

    it('should logout successfully with valid token', async () => {
      mockUserRepository.validateToken.mockResolvedValue(true);
      mockUserRepository.logout.mockResolvedValue(undefined);

      await logoutUseCase.execute(validToken);

      expect(mockUserRepository.validateToken).toHaveBeenCalledWith(validToken);
      expect(mockUserRepository.logout).toHaveBeenCalledWith(validToken);
    });

    it('should throw error if token is empty', async () => {
      await expect(logoutUseCase.execute('   ')).rejects.toThrow(
        'Token is required'
      );

      expect(mockUserRepository.validateToken).not.toHaveBeenCalled();
      expect(mockUserRepository.logout).not.toHaveBeenCalled();
    });

    it('should throw error if token is invalid', async () => {
      mockUserRepository.validateToken.mockResolvedValue(false);

      await expect(logoutUseCase.execute('invalid-token')).rejects.toThrow(
        'Invalid token'
      );

      expect(mockUserRepository.validateToken).toHaveBeenCalledWith('invalid-token');
      expect(mockUserRepository.logout).not.toHaveBeenCalled();
    });
  });
});
