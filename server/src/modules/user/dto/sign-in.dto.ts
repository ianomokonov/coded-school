import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto extends LoginDto {
  @ApiProperty({ description: 'Имя пользователя', nullable: true })
  name?: string;
}
