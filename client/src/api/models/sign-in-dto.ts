/* tslint:disable */
/* eslint-disable */
export interface SignInDto {

  /**
   * Email пользователя
   */
  email: string;

  /**
   * Имя пользователя
   */
  name?: string | null;

  /**
   * Пароль пользователя
   */
  password: string;
}
