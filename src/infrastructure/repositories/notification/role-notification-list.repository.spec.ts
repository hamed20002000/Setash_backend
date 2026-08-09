import { RoleNotificationListRepository } from './role-notification-list.repository';

describe('RoleNotificationListRepository', () => {
  it('deletes all role assignments when no notification list ids are provided', async () => {
    const repository = {
      delete: jest.fn().mockResolvedValue(undefined),
      find: jest.fn(),
    } as any;

    const repo = new RoleNotificationListRepository(repository);

    await repo.deleteByRoleIdAndNotificationListIds(1, []);

    expect(repository.delete).toHaveBeenCalledWith({ role: { id: 1 } });
    expect(repository.find).not.toHaveBeenCalled();
  });
});
