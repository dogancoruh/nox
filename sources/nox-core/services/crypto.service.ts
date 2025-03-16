import { Injectable } from '@angular/core';
import { AES, enc } from "crypto-ts";

declare var require: any;

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  public secretKey: string = "wi3n1l87DNB6MVssF49hD93bMZWX93b3";

  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(value: string): string {
    return AES.decrypt(value, this.secretKey).toString(enc.Utf8);
  }
}
