import { AuthResponse } from "../../../domain/entities/Session";
import { User } from "../../../domain/entities/User";
import { CreateUserRequest } from "../../../domain/interactor/auth/interfaces/ICreateUserUseCase";
import { LoginRequest } from "../../../domain/interactor/auth/interfaces/ILoginUseCase";
import { IUserRepository } from "../../../domain/repository/login/IUserRepository";
import api from "../../provider/axiosClient";
import { UserAdapter } from '../../adapter/UserAdapter';

export class UserRepository implements IUserRepository {
  createUser(userData: CreateUserRequest): Promise<AuthResponse> {
    const userDTO = {
      email: userData.email,
      password: userData.password,                                  // REVIEW the structure with backend
      name: `${userData.firstName} ${userData.lastName}`,
    };

    return api.post("/auth/signup", userDTO)
      .then(response => UserAdapter.toAuthResponse(response.data));
  }

    login(credentials: LoginRequest): Promise<AuthResponse> {
        return api.post("/auth/login", {credentials}).then(response => UserAdapter.toAuthResponse(response.data))
    }

    logout(token: string): Promise<void> {
        return api.post("/auth/logout", { refresh_token: token })
            .then(() => console.log("Logout successful"))
    }

    refreshToken(refreshToken: string): Promise<AuthResponse> {
        return api.post("/auth/refresh", { refresh_token: refreshToken })
            .then(response => UserAdapter.toAuthResponse(response.data))
    }

    getUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: string, userData: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateToken(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}