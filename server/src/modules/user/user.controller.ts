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
  ApiBody,
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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ type: SignInDto })
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
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authorization',
    type: JwtDto,
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully get author',
    type: UserShortDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getAuthor(@UserId() userId: number): Promise<UserShortDto> {
    return this.authService.getUser(userId);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Put('')
  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully update author',
    type: UserShortDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async patchAuthor(@UserId() userId: number, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(userId, dto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully refresh tokens',
    type: UserShortDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  refreshTokens(
    @UserId() { id, refreshToken }: { id: number; refreshToken: string },
  ) {
    return this.authService.refreshTokens(id, refreshToken);
  }
}
