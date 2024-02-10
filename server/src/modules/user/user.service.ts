/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '@entities/user/user.entity';
import { JwtDto } from '@dtos/user/jwt.dto';
import { ConfigService } from '@nestjs/config';
import { UserRoleEntity } from '@entities/user/user-role.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserShortDto } from '@dtos/user/user.dto';
import { UserFullInfoDto } from '@dtos/user/user-full-info.dto';
import { PassportUserDto } from '@dtos/user/passport.user.dto';
import { SignUpDto } from '@dtos/user/sign-up.dto';
import { SignInDto } from '@dtos/user/sign-in.dto';
import { dateNow } from '@core/date-now.fn';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import * as process from 'process';
import { MailService } from '@mail/service';
import { UpdateForgottenPassDto } from '@dtos/user/update-forgotten-pass.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {
    const uniqueLink = uuidv4();
  }

  async signUp(dto: SignUpDto): Promise<JwtDto> {
    const user = await this.findUserByEmail(dto.email);
    if (user) {
      throw new ForbiddenException('Пользователь уже зарегистрирован');
    }
    const newUser = UserEntity.create({
      ...dto,
      registrationDate: dateNow(),
      password: await this.getSaltedHash(dto.password),
    });
    const { id } = await newUser.save();

    const tokens = await this.getTokens(id);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async signIn(dto: SignInDto): Promise<JwtDto> {
    const user = await this.findUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isCorrectPassword = await compare(dto.password, user.password);
    if (!isCorrectPassword) {
      throw new ForbiddenException('Неверный пароль');
    }

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async passwordCheck(id: number, password: string): Promise<boolean> {
    const user = await UserEntity.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return compare(password, user.password);
  }

  async updatePassword(id: number, { password }): Promise<void> {
    const hashedPassword = await this.getSaltedHash(password);
    await UserEntity.update({ id }, { password: hashedPassword });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await UserEntity.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const data: ISendMailOptions = {
      to: email,
      subject: 'Сброс пароля',
      template: 'reset-password/template',
      context: {
        link: process.env.FRONT_URL + (await this.getUniqueLink(user.id)),
        userName: user.firstName,
      },
    };
    await this.mailService.sendMail(data);
  }

  async updateForgottenPassword({
    password,
    uniqueId,
  }: UpdateForgottenPassDto): Promise<void> {
    if (!this.jwtService.verify(uniqueId)) {
      throw new ForbiddenException('Токен недействителен');
    }
    const { id } = await this.jwtService.decode(uniqueId);
    const user = await UserEntity.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const hashedPassword = await this.getSaltedHash(password);
    await UserEntity.update({ id }, { password: hashedPassword });
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
    return this.mapper.map(entity, UserEntity, PassportUserDto);
  }

  async updateUserPassport(userId: number, dto: PassportUserDto) {
    await UserEntity.update({ id: userId }, dto);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.getSaltedHash(refreshToken);
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
      throw new NotFoundException('Пользователь не найден');
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

  private async getUniqueLink(id: number): Promise<string> {
    return this.jwtService.signAsync(
      {
        id,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '10m',
      },
    );
  }

  async getSaltedHash(token: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(token, salt);
  }
}
