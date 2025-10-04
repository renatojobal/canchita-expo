import { User } from '../../entities/User';

export interface IGetUserUseCase {
  executeById(id: string): Promise<User>;
  executeByEmail(email: string): Promise<User>;
}