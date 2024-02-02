import { ApiProperty } from '@nestjs/swagger';

export class UserShortDto {
  @ApiProperty({ description: 'Id пользователя', nullable: false })
  id: number;
  @ApiProperty({ description: 'Email пользователя', nullable: false })
  email: string;
  @ApiProperty({ description: 'Имя пользователя', nullable: false })
  name: string;
}
