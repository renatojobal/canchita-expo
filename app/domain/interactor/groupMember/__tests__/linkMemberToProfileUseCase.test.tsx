import { LinkMemberToProfileUseCase } from "../linkMemberToProfileUseCase";
import { IGroupMemberRepository } from "../../../repository/groupMember/IGroupMemberRepository";
import { IUserProfileRepository } from "../../../repository/userProfile/IUserProfileRepository";
import { GroupMember } from "../../../entities/GroupMember";
import { UserProfile } from "../../../entities/UserProfile";

describe("LinkMemberToProfileUseCase", () => {
  let linkMemberToProfileUseCase: LinkMemberToProfileUseCase;
  let mockGroupMemberRepository: jest.Mocked<IGroupMemberRepository>;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockGroupMemberRepository = {
      addMember: jest.fn(),
      getMemberById: jest.fn(),
      getMembersByGroup: jest.fn(),
      updateMember: jest.fn(),
      removeMember: jest.fn(),
      linkMemberToProfile: jest.fn(),
    };

    mockUserProfileRepository = {
      createUserProfile: jest.fn(),
      getUserProfileById: jest.fn(),
      getUserProfileByEmail: jest.fn(),
      updateUserProfile: jest.fn(),
      deleteUserProfile: jest.fn(),
      verifyUserProfile: jest.fn(),
    };

    linkMemberToProfileUseCase = new LinkMemberToProfileUseCase(
      mockGroupMemberRepository,
      mockUserProfileRepository
    );
  });

  describe("execute", () => {
    const mockMember: GroupMember = {
      id: "member-1",
      group_id: "group-1",
      name: "Test Member",
      email: "member@example.com",
      is_placeholder: true,
      joined_at: new Date(),
    };

    const mockUserProfile: UserProfile = {
      id: "profile-1",
      email: "member@example.com",
      name: "Test Member",
      is_verified: true,
      created_at: new Date(),
    };

    const linkedMember: GroupMember = {
      ...mockMember,
      user_profile_id: "profile-1",
      is_placeholder: false,
    };

    it("should link member to profile successfully", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);
      mockGroupMemberRepository.linkMemberToProfile.mockResolvedValue(linkedMember);

      const result = await linkMemberToProfileUseCase.execute("member-1", "profile-1");

      expect(result).toEqual(linkedMember);
      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("profile-1");
      expect(mockGroupMemberRepository.linkMemberToProfile).toHaveBeenCalledWith("member-1", "profile-1");
    });

    it("should throw error if member ID is empty", async () => {
      await expect(linkMemberToProfileUseCase.execute("   ", "profile-1")).rejects.toThrow("Member ID is required");

      expect(mockGroupMemberRepository.getMemberById).not.toHaveBeenCalled();
      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.linkMemberToProfile).not.toHaveBeenCalled();
    });

    it("should throw error if profile ID is empty", async () => {
      await expect(linkMemberToProfileUseCase.execute("member-1", "   ")).rejects.toThrow("Profile ID is required");

      expect(mockGroupMemberRepository.getMemberById).not.toHaveBeenCalled();
      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.linkMemberToProfile).not.toHaveBeenCalled();
    });

    it("should throw error if member not found", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(null);

      await expect(linkMemberToProfileUseCase.execute("member-999", "profile-1")).rejects.toThrow(
        "Member not found"
      );

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-999");
      expect(mockUserProfileRepository.getUserProfileById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.linkMemberToProfile).not.toHaveBeenCalled();
    });

    it("should throw error if user profile not found", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(null);

      await expect(linkMemberToProfileUseCase.execute("member-1", "profile-999")).rejects.toThrow(
        "User profile not found"
      );

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("profile-999");
      expect(mockGroupMemberRepository.linkMemberToProfile).not.toHaveBeenCalled();
    });

    it("should throw error if member is already linked to a profile", async () => {
      const alreadyLinkedMember: GroupMember = {
        ...mockMember,
        user_profile_id: "existing-profile",
      };

      mockGroupMemberRepository.getMemberById.mockResolvedValue(alreadyLinkedMember);
      mockUserProfileRepository.getUserProfileById.mockResolvedValue(mockUserProfile);

      await expect(linkMemberToProfileUseCase.execute("member-1", "profile-1")).rejects.toThrow(
        "Member is already linked to a profile"
      );

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith("profile-1");
      expect(mockGroupMemberRepository.linkMemberToProfile).not.toHaveBeenCalled();
    });
  });
});
