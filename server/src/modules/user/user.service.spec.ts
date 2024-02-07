import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/entities/user/user.entity';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtDto } from './dto/jwt.dto';
import { UserRoleEntity } from 'src/entities/user/user-role.entity';

const loginDtoMock = { email: 'email', password: 'password' };
const jwtDtoMock = {
  token: 'token',
  refreshToken: 'refreshToken',
};

describe('UserService', () => {
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(() => {
    jwtService = new JwtService();
    configService = new ConfigService();
    userService = new UserService(jwtService, configService);
  });

  describe('signIn', () => {
    it('should throw error if user exists', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => new UserEntity());

      try {
        await userService.signIn(loginDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should create user', async () => {
      const userEntity = new UserEntity();
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => null);
      jest.spyOn(bcryptjs, 'genSalt').mockImplementation(() => '123');
      jest.spyOn(bcryptjs, 'hash').mockImplementation(() => 'hash');
      jest.spyOn(UserEntity, 'create').mockImplementation(() => {
        return userEntity;
      });
      jest.spyOn(userEntity, 'save').mockImplementation(async () => {
        return {
          id: 1,
        } as any;
      });
      jest
        .spyOn<any, any>(userService, 'getTokens')
        .mockImplementation(async () => jwtDtoMock as JwtDto);
      jest
        .spyOn<any, any>(userService, 'updateRefreshToken')
        .mockImplementation(async () => {});

      const result = await userService.signIn(loginDtoMock);

      expect(bcryptjs.hash).toHaveBeenCalledWith(loginDtoMock.password, '123');
      expect(UserEntity.create).toHaveBeenCalledWith({
        email: loginDtoMock.email,
        password: 'hash',
        name: undefined,
      });
      expect(userService['getTokens']).toHaveBeenCalledWith(1);
      expect(userService['updateRefreshToken']).toHaveBeenCalledWith(
        1,
        jwtDtoMock.refreshToken,
      );
      expect(result).toEqual(jwtDtoMock);
    });
  });
  describe('logIn', () => {
    it('should throw error if user does not exists', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => null);

      try {
        await userService.logIn(loginDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw error if password is not correct', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => new UserEntity());
      jest.spyOn(bcryptjs, 'compare').mockImplementation(() => false);

      try {
        await userService.logIn(loginDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw error if password is not correct', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => new UserEntity());
      jest.spyOn(bcryptjs, 'compare').mockImplementation(() => false);

      try {
        await userService.logIn(loginDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should login user', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => ({ id: 1 }) as any);
      jest
        .spyOn<any, any>(userService, 'getTokens')
        .mockImplementation(async () => jwtDtoMock as JwtDto);
      jest
        .spyOn<any, any>(userService, 'updateRefreshToken')
        .mockImplementation(async () => {});
      jest.spyOn(bcryptjs, 'compare').mockImplementation(() => true);

      const result = await userService.logIn(loginDtoMock);

      expect(userService['getTokens']).toHaveBeenCalledWith(1);
      expect(userService['updateRefreshToken']).toHaveBeenCalledWith(
        1,
        jwtDtoMock.refreshToken,
      );
      expect(result).toEqual(jwtDtoMock);
    });
  });
  describe('getTokens', () => {
    it('should return signed tokens', async () => {
      jest
        .spyOn<any, any>(jwtService, 'signAsync')
        .mockResolvedValueOnce(jwtDtoMock.token)
        .mockResolvedValueOnce(jwtDtoMock.refreshToken);
      jest
        .spyOn<any, any>(configService, 'get')
        .mockReturnValueOnce('1')
        .mockResolvedValueOnce('2');

      jest.spyOn(UserRoleEntity, 'find').mockImplementation(async () => []);

      expect(await userService['getTokens'](1)).toEqual(jwtDtoMock);
    });
  });

  describe('refreshTokens', () => {
    it('should throw error if user does not exists', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(async () => null);

      try {
        await userService['refreshTokens'](1, jwtDtoMock.refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should throw error if user refresh token does not exists', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(async () => new UserEntity());

      try {
        await userService['refreshTokens'](1, jwtDtoMock.refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should throw error if token is incorrect', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(
          async () => ({ refreshToken: jwtDtoMock.refreshToken }) as any,
        );
      jest
        .spyOn<any, any>(bcryptjs, 'compare')
        .mockImplementation(async () => false);

      try {
        await userService['refreshTokens'](1, jwtDtoMock.refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
    it('should refresh tokens', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(
          async () => ({ refreshToken: jwtDtoMock.refreshToken }) as any,
        );
      jest
        .spyOn<any, any>(bcryptjs, 'compare')
        .mockImplementation(async () => true);
      jest
        .spyOn<any, any>(userService, 'getTokens')
        .mockImplementation(async () => jwtDtoMock as JwtDto);
      jest
        .spyOn<any, any>(userService, 'updateRefreshToken')
        .mockImplementation(async () => {});

      const result = await userService['refreshTokens'](1, '123');

      expect(userService['getTokens']).toHaveBeenCalledTimes(1);
      expect(userService['updateRefreshToken']).toHaveBeenCalledTimes(1);

      expect(result).toEqual(jwtDtoMock);
    });
  });
});
