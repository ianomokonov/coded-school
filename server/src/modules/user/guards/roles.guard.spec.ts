import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflectorMock: Reflector = { getAllAndOverride: () => [] } as any;
  let contextMock = {
    getHandler: () => {},
    getClass: () => {},
    switchToHttp: () => ({
      getRequest: () => ({}),
    }),
  } as any;

  beforeEach(() => {
    guard = new RolesGuard(reflectorMock);
  });

  describe('canActivate', () => {
    it('should return true if no roles', () => {
      jest
        .spyOn(reflectorMock, 'getAllAndOverride')
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => []);
      expect(guard.canActivate(contextMock)).toBeTruthy();
      expect(guard.canActivate(contextMock)).toBeTruthy();
    });
    it('should return false if user do not has role', () => {
      jest
        .spyOn(reflectorMock, 'getAllAndOverride')
        .mockImplementation(() => ['admin']);
      jest
        .spyOn(contextMock, 'switchToHttp')
        .mockImplementationOnce(() => ({
          getRequest: () => ({ user: { roles: ['user'] } }),
        }))
        .mockImplementationOnce(() => ({
          getRequest: () => ({ user: { roles: [] } }),
        }))
        .mockImplementationOnce(() => ({
          getRequest: () => ({ user: {} }),
        }))
        .mockImplementationOnce(() => ({
          getRequest: () => ({}),
        }));
      expect(guard.canActivate(contextMock)).toBeFalsy();
      expect(guard.canActivate(contextMock)).toBeFalsy();
      expect(guard.canActivate(contextMock)).toBeFalsy();
      expect(guard.canActivate(contextMock)).toBeFalsy();
    });
    it('should return true if user has role', () => {
      jest
        .spyOn(reflectorMock, 'getAllAndOverride')
        .mockImplementation(() => ['admin']);
      jest.spyOn(contextMock, 'switchToHttp').mockImplementationOnce(() => ({
        getRequest: () => ({ user: { roles: ['admin'] } }),
      }));
      expect(guard.canActivate(contextMock)).toBeTruthy();
    });
  });
});
