/* tslint:disable */
/* eslint-disable */
export interface PassportUserDto {
  birthDate?: string;
  city?: string;
  country?: string;
  email: string;
  firstName: string;
  gender: 'MALE' | 'FEMALE' | 'UNSET';
  id: number;
  referLink: string;
  registrationDate: string;
  secondName?: string;
  surname?: string;
}
