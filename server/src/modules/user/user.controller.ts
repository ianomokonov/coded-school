import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserId } from 'src/decorators/author-id.decorator';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserService } from './user.service';
import { JwtDto } from './dto/jwt.dto';
import { UserShortDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto): Promise<JwtDto> {
    // const oldUser = await this.authService.findUser(dto.login, dto.email);
    // if (oldUser) {
    //   throw new BadRequestException(
    //     'Пользователь с таким логином или email уже существует',
    //   );
    // }
    return this.authService.signIn(dto);
  }

  @HttpCode(200)
  @Post('log-in')
  async logIn(@Body() dto: LoginDto): Promise<JwtDto> {
    return this.authService.logIn(dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAuthor(@UserId() userId: string): Promise<UserShortDto> {
    return this.authService.getUser(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Put('')
  async patchAuthor(@UserId() userId: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(userId, dto);
  }
}
