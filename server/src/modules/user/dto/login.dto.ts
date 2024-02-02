import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email пользователя', nullable: false })
  email: string;
  @ApiProperty({ description: 'Пароль пользователя', nullable: false })
  password: string;
}
