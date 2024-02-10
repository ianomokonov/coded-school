import { UserShortDto } from './user.dto';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNSET = 'UNSET',
}

export class PassportUserDto extends UserShortDto {
  birthDate?: Date;
  gender: GenderEnum;
  city?: string;
  country?: string;
}
