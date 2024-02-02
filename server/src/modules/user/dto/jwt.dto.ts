import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({ description: 'Access Token', nullable: false })
  token: string;
  @ApiProperty({ description: 'Refresh Token', nullable: false })
  refreshToken: string;
}
