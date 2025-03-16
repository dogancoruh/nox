import { Injectable } from '@angular/core';
import { AES, enc } from "crypto-ts";

declare var require: any;

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  public secretKey: string = "";

  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(value: string): string {
    return AES.decrypt(value, this.secretKey).toString(enc.Utf8);
  }
}
