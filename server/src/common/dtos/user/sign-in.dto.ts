import { LoginDto } from './login.dto';

export class SignInDto extends LoginDto {
  firstName: string;
  secondName?: string;
  surname?: string;
}
