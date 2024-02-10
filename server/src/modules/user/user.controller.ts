import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from '@decorators/author-id.decorator';
import { SignInDto } from '@dtos/user/sign-in.dto';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { UserService } from './user.service';
import { JwtDto } from '@dtos/user/jwt.dto';
import { UserShortDto } from '@dtos/user/user.dto';
import { RefreshTokenGuard } from '@guards/user/jwt-refresh.quard';
import { RefreshToken } from '@decorators/refresh-token.decorator';
import { UserFullInfoDto } from '@dtos/user/user-full-info.dto';
import { PassportUserDto } from '@dtos/user/passport.user.dto';
import { SignUpDto } from '@dtos/user/sign-up.dto';
import { PasswordDto } from '@dtos/user/password.dto';
import { UpdateForgottenPassDto } from '@dtos/user/update-forgotten-pass.dto';

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
  async signUp(@Body() dto: SignUpDto): Promise<JwtDto> {
    return this.authService.signUp(dto);
  }

  @HttpCode(200)
  @Post('sign-in')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async signIn(@Body() dto: SignInDto): Promise<JwtDto> {
    return this.authService.signIn(dto);
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
  @Put('')
  @ApiOperation({ summary: 'Обновление информации о пользователе' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async patchPassport(
    @UserId() userId: number,
    @Body() dto: PassportUserDto,
  ): Promise<void> {
    return this.authService.updateUserPassport(userId, dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Put('/update-password')
  @ApiOperation({ summary: 'Обновление пароля пользователя' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async patchPassword(
    @UserId() userId: number,
    @Body() data: PasswordDto,
  ): Promise<void> {
    return this.authService.updatePassword(userId, data);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('/check-password')
  @ApiOperation({ summary: 'Проверка корректности пароля' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async isPasswordCorrect(
    @UserId() userId: number,
    @Query('password') password: string,
  ): Promise<boolean> {
    return this.authService.passwordCheck(userId, password);
  }

  @Get('/forgot-password')
  @ApiOperation({ summary: 'Отправка ссылки для нового пароля' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async forgotPassword(@Query('email') email: string): Promise<void> {
    return this.authService.forgotPassword(email);
  }

  @Put('/forgot-password')
  @ApiOperation({ summary: 'Восстановление пароля по ссылке' })
  @ApiResponse({
    status: HttpStatus.RESET_CONTENT,
    description: 'Password successfully reset',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async updateForgottenPassword(
    @Body() dto: UpdateForgottenPassDto,
  ): Promise<void> {
    return this.authService.updateForgottenPassword(dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('full-info')
  @ApiOperation({ summary: 'Получение информации в Личном кабинете' })
  async getUserFullInfo(@UserId() userId: number): Promise<UserFullInfoDto> {
    return this.authService.getUserFullInfo(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('passport')
  @ApiOperation({ summary: 'Получение полной информации пользователя' })
  async getPassportInfo(@UserId() userId: number): Promise<PassportUserDto> {
    return this.authService.getUserPassport(userId);
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
