import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '@configs/jwt.config';
import { JwtStrategy } from '@strategies/user/jwt.strategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtRefreshStrategy } from '@strategies/user/jwt-refresh.strategy';
import { UserProfile } from '@profiles/user.profile';
import { MailService } from '@mail/service';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    UserService,
    JwtStrategy,
    JwtRefreshStrategy,
    UserProfile,
    MailService,
  ],
  exports: [UserService],
})
export class UserModule {}
