import { RegisterError } from "../enums/register-error";

export class RegisterResponse {
  success: boolean = false;
  error: RegisterError = "none";
}
