import { HttpContextToken } from "@angular/common/http";

export const NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN = new HttpContextToken<boolean>(() => false);
