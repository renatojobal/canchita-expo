import { AddGroupMemberUseCase } from "../addGroupMemberUseCase";
import { IGroupMemberRepository } from "../../../repository/groupMember/IGroupMemberRepository";
import { IGroupRepository } from "../../../repository/group/IGroupRepository";
import { GroupMember } from "../../../entities/GroupMember";
import { Group } from "../../../entities/Group";
import { AddGroupMemberRequest } from "../interfaces/IAddGroupMemberUseCase";

describe("AddGroupMemberUseCase", () => {
  let addGroupMemberUseCase: AddGroupMemberUseCase;
  let mockGroupMemberRepository: jest.Mocked<IGroupMemberRepository>;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    mockGroupMemberRepository = {
      addMember: jest.fn(),
      getMemberById: jest.fn(),
      getMembersByGroup: jest.fn(),
      updateMember: jest.fn(),
      removeMember: jest.fn(),
      linkMemberToProfile: jest.fn(),
    };

    mockGroupRepository = {
      createGroup: jest.fn(),
      getGroupById: jest.fn(),
      getGroupsByOwner: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
    };

    addGroupMemberUseCase = new AddGroupMemberUseCase(mockGroupMemberRepository, mockGroupRepository);
  });

  describe("execute", () => {
    const mockGroup: Group = {
      id: "group-1",
      name: "Test Group",
      owner_profile_id: "user-1",
      created_at: new Date(),
    };

    const validMemberData: AddGroupMemberRequest = {
      group_id: "group-1",
      name: "Test Member",
      email: "member@example.com",
      is_placeholder: false,
    };

    const mockMember: GroupMember = {
      id: "member-1",
      group_id: "group-1",
      name: "Test Member",
      email: "member@example.com",
      is_placeholder: false,
      joined_at: new Date(),
    };

    it("should add group member successfully with valid data", async () => {
      mockGroupRepository.getGroupById.mockResolvedValue(mockGroup);
      mockGroupMemberRepository.addMember.mockResolvedValue(mockMember);

      const result = await addGroupMemberUseCase.execute(validMemberData);

      expect(result).toEqual(mockMember);
      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith(validMemberData.group_id);
      expect(mockGroupMemberRepository.addMember).toHaveBeenCalledWith(validMemberData);
    });

    it("should throw error if group ID is empty", async () => {
      const invalidMemberData: AddGroupMemberRequest = {
        group_id: "   ",
        name: "Test Member",
        email: "member@example.com",
      };

      await expect(addGroupMemberUseCase.execute(invalidMemberData)).rejects.toThrow("Group ID is required");

      expect(mockGroupRepository.getGroupById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.addMember).not.toHaveBeenCalled();
    });

    it("should throw error if member name is empty", async () => {
      const invalidMemberData: AddGroupMemberRequest = {
        group_id: "group-1",
        name: "   ",
        email: "member@example.com",
      };

      await expect(addGroupMemberUseCase.execute(invalidMemberData)).rejects.toThrow("Member name is required");

      expect(mockGroupRepository.getGroupById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.addMember).not.toHaveBeenCalled();
    });

    it("should throw error if email format is invalid", async () => {
      const invalidMemberData: AddGroupMemberRequest = {
        group_id: "group-1",
        name: "Test Member",
        email: "invalid-email",
      };

      await expect(addGroupMemberUseCase.execute(invalidMemberData)).rejects.toThrow("Invalid email format");

      expect(mockGroupRepository.getGroupById).not.toHaveBeenCalled();
      expect(mockGroupMemberRepository.addMember).not.toHaveBeenCalled();
    });

    it("should throw error if group not found", async () => {
      mockGroupRepository.getGroupById.mockResolvedValue(null);

      await expect(addGroupMemberUseCase.execute(validMemberData)).rejects.toThrow("Group not found");

      expect(mockGroupRepository.getGroupById).toHaveBeenCalledWith(validMemberData.group_id);
      expect(mockGroupMemberRepository.addMember).not.toHaveBeenCalled();
    });
  });
});
