import { UpdateGroupMemberUseCase } from "../updateGroupMemberUseCase";
import { IGroupMemberRepository } from "../../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../../entities/GroupMember";
import { UpdateGroupMemberRequest } from "../interfaces/IUpdateGroupMemberUseCase";

describe("UpdateGroupMemberUseCase", () => {
  let updateGroupMemberUseCase: UpdateGroupMemberUseCase;
  let mockGroupMemberRepository: jest.Mocked<IGroupMemberRepository>;

  beforeEach(() => {
    mockGroupMemberRepository = {
      addMember: jest.fn(),
      getMemberById: jest.fn(),
      getMembersByGroup: jest.fn(),
      updateMember: jest.fn(),
      removeMember: jest.fn(),
      linkMemberToProfile: jest.fn(),
    };

    updateGroupMemberUseCase = new UpdateGroupMemberUseCase(mockGroupMemberRepository);
  });

  describe("execute", () => {
    const mockMember: GroupMember = {
      id: "member-1",
      group_id: "group-1",
      name: "Test Member",
      email: "member@example.com",
      is_placeholder: false,
      joined_at: new Date(),
    };

    const updatedMember: GroupMember = {
      ...mockMember,
      name: "Updated Name",
    };

    it("should update group member successfully", async () => {
      const updateData: UpdateGroupMemberRequest = {
        name: "Updated Name",
      };

      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);
      mockGroupMemberRepository.updateMember.mockResolvedValue(updatedMember);

      const result = await updateGroupMemberUseCase.execute("member-1", updateData);

      expect(result).toEqual(updatedMember);
      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockGroupMemberRepository.updateMember).toHaveBeenCalledWith("member-1", updateData);
    });

    it("should throw error if ID is empty", async () => {
      const updateData: UpdateGroupMemberRequest = {
        name: "Updated Name",
      };

      await expect(updateGroupMemberUseCase.execute("   ", updateData)).rejects.toThrow("Member ID is required");

      expect(mockGroupMemberRepository.getMemberById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.updateMember).not.toHaveBeenCalled();
    });

    it("should throw error if member not found", async () => {
      const updateData: UpdateGroupMemberRequest = {
        name: "Updated Name",
      };

      mockGroupMemberRepository.getMemberById.mockResolvedValue(null);

      await expect(updateGroupMemberUseCase.execute("member-999", updateData)).rejects.toThrow("Member not found");

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-999");
      expect(mockGroupMemberRepository.updateMember).not.toHaveBeenCalled();
    });

    it("should throw error if member name is empty", async () => {
      const updateData: UpdateGroupMemberRequest = {
        name: "   ",
      };

      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);

      await expect(updateGroupMemberUseCase.execute("member-1", updateData)).rejects.toThrow(
        "Member name cannot be empty"
      );

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockGroupMemberRepository.updateMember).not.toHaveBeenCalled();
    });

    it("should throw error if email format is invalid", async () => {
      const updateData: UpdateGroupMemberRequest = {
        email: "invalid-email",
      };

      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);

      await expect(updateGroupMemberUseCase.execute("member-1", updateData)).rejects.toThrow("Invalid email format");

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockGroupMemberRepository.updateMember).not.toHaveBeenCalled();
    });
  });
});
