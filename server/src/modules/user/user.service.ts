/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from '@dtos/user/login.dto';
import { SignInDto } from '@dtos/user/sign-in.dto';
import { UserEntity } from '@entities/user/user.entity';
import { JwtDto } from '@dtos/user/jwt.dto';
import { UpdateUserDto } from '@dtos/user/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserRoleEntity } from '@entities/user/user-role.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserShortDto } from '@dtos/user/user.dto';
import { UserFullInfoDto } from '@dtos/user/user-full-info.dto';
import { PassportUserDto } from './dto/passport.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(dto: SignInDto): Promise<JwtDto> {
    const user = await this.findUserByEmail(dto.email);
    if (user) {
      throw new UnauthorizedException('Пользователь уже зарегистрирован');
    }
    const salt = await genSalt(10);
    const newUser = UserEntity.create({
      ...dto,
      password: await hash(dto.password, salt),
    });
    const { id } = await newUser.save();

    const tokens = await this.getTokens(id);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async logIn(dto: LoginDto): Promise<JwtDto> {
    const user = await this.findUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isCorrectPassword = await compare(dto.password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getUser(id: number): Promise<UserShortDto> {
    const user = await UserEntity.findOne({
      where: { id },
    });
    return this.mapper.map(user, UserEntity, UserShortDto);
  }

  async getUserFullInfo(id: number): Promise<UserFullInfoDto> {
    const user = await UserEntity.findOne({
      where: { id },
      relations: {
        modules: {
          module: true,
        },
        marathons: {
          marathon: true,
        },
        achievements: {
          achievement: true,
        },
      },
    });
    return this.mapper.map(user, UserEntity, UserFullInfoDto);
  }

  async getUserPassport(id: number): Promise<PassportUserDto> {
    const entity = await UserEntity.findOne({ where: { id } });
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      secondName: entity.secondName,
      surname: entity.surname,
      birthDate: entity.birtDate,
      address: entity.address,
      gender: entity.gender,
    };
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    await UserEntity.update({ id: userId }, dto);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const salt = await genSalt(10);
    const hashedRefreshToken = await hash(refreshToken, salt);
    await UserEntity.update(
      { id: userId },
      {
        refreshToken: hashedRefreshToken,
      },
    );
  }

  async logout(userId: number) {
    await UserEntity.update({ id: userId }, { refreshToken: null });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await UserEntity.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches)
      throw new ForbiddenException('Токен недействителен');

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async findUserByEmail(email: string): Promise<UserEntity | void> {
    return UserEntity.findOne({
      where: { email },
    });
  }

  private async getTokens(id: number): Promise<JwtDto> {
    const roles = await UserRoleEntity.find({
      where: { userId: id },
      relations: { role: true },
    });
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          roles: roles.map((r) => r.role.name),
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
