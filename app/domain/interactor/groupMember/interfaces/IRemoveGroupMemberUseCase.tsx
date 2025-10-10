export interface IRemoveGroupMemberUseCase {
  execute(id: string): Promise<void>;
}
