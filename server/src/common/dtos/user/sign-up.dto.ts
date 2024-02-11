import { SignInDto } from './sign-in.dto';

export class SignUpDto extends SignInDto {
  firstName: string;
  secondName?: string;
  surname?: string;
  inviterCode?: string;
}
