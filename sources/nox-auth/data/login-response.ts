import { LoginError } from "../enums/login-error";

export class LoginResult {
  success: boolean = false;
  error: LoginError = "none";
  accessToken: string = "";
  refreshToken: string = "";
}
