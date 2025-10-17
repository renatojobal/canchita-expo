import { AuthResponse } from "../../domain/entities/Session";

export class UserAdapter {
  static toAuthResponse(dto: any): AuthResponse {
    const user = dto.user;
    const [firstName, lastName] = user.name.split(' ');

    return {
      user: {
        id: user.id,
        email: user.email,
        username: "",
        firstName: firstName || "",
        lastName: lastName || "",
        avatar: "",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token: dto.access_token,
      refreshToken: dto.refresh_token,
    };
  }

}
