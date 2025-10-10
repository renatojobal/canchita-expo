import { GetGroupMemberUseCase } from "../getGroupMemberUseCase";
import { IGroupMemberRepository } from "../../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../../entities/GroupMember";

describe("GetGroupMemberUseCase", () => {
  let getGroupMemberUseCase: GetGroupMemberUseCase;
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

    getGroupMemberUseCase = new GetGroupMemberUseCase(mockGroupMemberRepository);
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

    it("should get group member successfully with valid ID", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(mockMember);

      const result = await getGroupMemberUseCase.execute("member-1");

      expect(result).toEqual(mockMember);
      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-1");
    });

    it("should return null if member not found", async () => {
      mockGroupMemberRepository.getMemberById.mockResolvedValue(null);

      const result = await getGroupMemberUseCase.execute("member-999");

      expect(result).toBeNull();
      expect(mockGroupMemberRepository.getMemberById).toHaveBeenCalledWith("member-999");
    });

    it("should throw error if ID is empty", async () => {
      await expect(getGroupMemberUseCase.execute("   ")).rejects.toThrow("Member ID is required");

      expect(mockGroupMemberRepository.getMemberById).not.toHaveBeenCalled();
    });
  });
});
