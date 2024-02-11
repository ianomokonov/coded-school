import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@entities/user/user.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtDto } from '@dtos/user/jwt.dto';
import { UserRoleEntity } from '@entities/role/user-role.entity';
import { Mapper } from '@automapper/core';
import { MailService } from '@mail/service';
import { SignUpDto } from '@dtos/user/sign-up.dto';

const signUpDtoMock: SignUpDto = {
  email: 'email',
  password: 'password',
  firstName: 'firstName',
};
const jwtDtoMock = {
  token: 'token',
  refreshToken: 'refreshToken',
};

describe('UserService', () => {
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let mailService: MailService;
  let mapper: Mapper;

  beforeEach(() => {
    jwtService = new JwtService();
    configService = new ConfigService();
    userService = new UserService(
      mapper,
      jwtService,
      configService,
      mailService,
    );
  });

  describe('signUp', () => {
    it('should throw error if user exists', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => new UserEntity());

      try {
        await userService.signUp(signUpDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
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

      const result = await userService.signUp(signUpDtoMock);

      expect(bcryptjs.hash).toHaveBeenCalledWith(signUpDtoMock.password, '123');
      // expect(UserEntity.create).toHaveBeenCalledWith({
      //   email: signUpDtoMock.email,
      //   password: 'hash',
      //   firstName: signUpDtoMock.firstName,
      //   referralCode: '123',
      //   registrationDate: dateNow(),
      // });
      expect(userService['getTokens']).toHaveBeenCalledWith(1);
      expect(userService['updateRefreshToken']).toHaveBeenCalledWith(
        1,
        jwtDtoMock.refreshToken,
      );
      expect(result).toEqual(jwtDtoMock);
    });
  });
  describe('signIn', () => {
    it('should throw error if user does not exists', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => null);

      try {
        await userService.signIn(signUpDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw error if password is not correct', async () => {
      jest
        .spyOn<any, any>(userService, 'findUserByEmail')
        .mockImplementation(async () => new UserEntity());
      jest.spyOn(bcryptjs, 'compare').mockImplementation(() => false);

      try {
        await userService.signIn(signUpDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
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

      const result = await userService.signIn(signUpDtoMock);

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
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw error if user refresh token does not exists', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(async () => new UserEntity());

      try {
        await userService['refreshTokens'](1, jwtDtoMock.refreshToken);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
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
