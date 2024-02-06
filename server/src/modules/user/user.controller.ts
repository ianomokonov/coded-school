import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from 'src/decorators/author-id.decorator';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserService } from './user.service';
import { JwtDto } from './dto/jwt.dto';
import { UserShortDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RefreshTokenGuard } from './guards/jwt-refresh.quard';
import { UserFullInfoDto } from './dto/user-full-info.dto';
import { RefreshToken } from 'src/decorators/refresh-token.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created',
    type: JwtDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async signIn(@Body() dto: SignInDto): Promise<JwtDto> {
    return this.authService.signIn(dto);
  }

  @HttpCode(200)
  @Post('sign-in')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async logIn(@Body() dto: LoginDto): Promise<JwtDto> {
    return this.authService.logIn(dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @HttpCode(205)
  @Post('logout')
  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @ApiResponse({
    status: HttpStatus.RESET_CONTENT,
    description: 'Successfully unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async logout(@UserId() userId: number): Promise<void> {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('')
  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getUser(@UserId() userId: number): Promise<UserShortDto> {
    return this.authService.getUser(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('full-info')
  @ApiOperation({ summary: 'Получение полной информации пользователя' })
  async getUserFullInfo(@UserId() userId: number): Promise<UserFullInfoDto> {
    return this.authService.getUserFullInfo(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Put('')
  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async patchAuthor(@UserId() userId: number, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(userId, dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  refreshTokens(@UserId() id: number, @RefreshToken() refreshToken: string) {
    return this.authService.refreshTokens(id, refreshToken);
  }
}
