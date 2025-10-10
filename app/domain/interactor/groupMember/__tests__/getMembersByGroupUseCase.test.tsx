import { GetMembersByGroupUseCase } from "../getMembersByGroupUseCase";
import { IGroupMemberRepository } from "../../../repository/groupMember/IGroupMemberRepository";
import { GroupMember } from "../../../entities/GroupMember";

describe("GetMembersByGroupUseCase", () => {
  let getMembersByGroupUseCase: GetMembersByGroupUseCase;
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

    getMembersByGroupUseCase = new GetMembersByGroupUseCase(mockGroupMemberRepository);
  });

  describe("execute", () => {
    const mockMembers: GroupMember[] = [
      {
        id: "member-1",
        group_id: "group-1",
        name: "Test Member 1",
        email: "member1@example.com",
        is_placeholder: false,
        joined_at: new Date(),
      },
      {
        id: "member-2",
        group_id: "group-1",
        name: "Test Member 2",
        email: "member2@example.com",
        is_placeholder: true,
        joined_at: new Date(),
      },
    ];

    it("should get members by group successfully", async () => {
      mockGroupMemberRepository.getMembersByGroup.mockResolvedValue(mockMembers);

      const result = await getMembersByGroupUseCase.execute("group-1");

      expect(result).toEqual(mockMembers);
      expect(mockGroupMemberRepository.getMembersByGroup).toHaveBeenCalledWith("group-1");
    });

    it("should return empty array if no members found", async () => {
      mockGroupMemberRepository.getMembersByGroup.mockResolvedValue([]);

      const result = await getMembersByGroupUseCase.execute("group-999");

      expect(result).toEqual([]);
      expect(mockGroupMemberRepository.getMembersByGroup).toHaveBeenCalledWith("group-999");
    });

    it("should throw error if group ID is empty", async () => {
      await expect(getMembersByGroupUseCase.execute("   ")).rejects.toThrow("Group ID is required");

      expect(mockGroupMemberRepository.getMembersByGroup).not.toHaveBeenCalled();
    });
  });
});
