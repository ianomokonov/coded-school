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
import { RefreshTokenGuard } from './guards/jwt-refresh.quard';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('sign-up')
  async signIn(@Body() dto: SignInDto): Promise<JwtDto> {
    return this.authService.signIn(dto);
  }

  @HttpCode(200)
  @Post('sign-in')
  async logIn(@Body() dto: LoginDto): Promise<JwtDto> {
    return this.authService.logIn(dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@UserId() userId: number): Promise<void> {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAuthor(@UserId() userId: number): Promise<UserShortDto> {
    return this.authService.getUser(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Put('')
  async patchAuthor(@UserId() userId: number, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(userId, dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @UserId() { id, refreshToken }: { id: number; refreshToken: string },
  ) {
    return this.authService.refreshTokens(id, refreshToken);
  }
}
