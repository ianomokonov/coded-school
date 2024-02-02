import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Имя пользователя', nullable: false })
  name: string;
}
