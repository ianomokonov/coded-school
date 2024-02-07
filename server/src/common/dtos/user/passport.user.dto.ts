import { UserShortDto } from './user.dto';

export enum GenderEnum {
  MALE = 'Мужской',
  FEMALE = 'Женский',
  UNSET = 'Не указано',
}

export class PassportUserDto extends UserShortDto {
  birthDate: Date;
  gender: GenderEnum;
  address: string;
}
