/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserEntity } from 'src/entities/user/user.entity';
import { JwtDto } from './dto/jwt.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(dto: SignInDto): Promise<JwtDto> {
    const salt = await genSalt(10);
    const newAuthor = UserEntity.create({
      email: dto.email,
      password: await hash(dto.password, salt),
    });
    const { id } = await newAuthor.save();

    return { token: await this.jwtService.signAsync({ id }) };
  }

  async logIn(dto: LoginDto): Promise<JwtDto> {
    const author = await this.findUser(dto.login);
    if (!author) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isCorrectPassword = compare(dto.password, author.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return {
      token: await this.jwtService.signAsync({ id: author.id }),
    };
  }

  async findUser(email: string): Promise<UserEntity | void> {}

  async getUser(id: string) {}

  async updateUser(userId: string, dto: UpdateUserDto) {}
}
