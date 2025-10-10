import { RemoveGroupMemberUseCase } from "../removeGroupMemberUseCase";
import { IGroupMemberRepository } from "../../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../../entities/GroupMember";

describe("RemoveGroupMemberUseCase", () => {
  let removeGroupMemberUseCase: RemoveGroupMemberUseCase;
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

    removeGroupMemberUseCase = new RemoveGroupMemberUseCase(mockGroupMemberRepository);
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

    it("should remove group member successfully", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);
      mockGroupMemberRepository.removeMember.mockResolvedValue(undefined);

      await removeGroupMemberUseCase.execute("member-1");

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
      expect(mockGroupMemberRepository.removeMember).toHaveBeenCalledWith("member-1");
    });

    it("should throw error if ID is empty", async () => {
      await expect(removeGroupMemberUseCase.execute("   ")).rejects.toThrow("Member ID is required");

      expect(mockGroupMemberRepository.getMemberById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.removeMember).not.toHaveBeenCalled();
    });

    it("should throw error if member not found", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(null);

      await expect(removeGroupMemberUseCase.execute("member-999")).rejects.toThrow("Member not found");

      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-999");
      expect(mockGroupMemberRepository.removeMember).not.toHaveBeenCalled();
    });
  });
});
