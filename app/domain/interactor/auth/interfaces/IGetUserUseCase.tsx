import { UserProfile } from '../../../entities/UserProfile';

export interface IGetUserUseCase {
  executeById(id: string): Promise<UserProfile>;
  executeByEmail(email: string): Promise<UserProfile>;
}