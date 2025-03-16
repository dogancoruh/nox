import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoxAuthService } from './services/nox-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CryptoService } from '../nox-core/services/crypto.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
  ],
  providers: [
    NoxAuthService,
    CryptoService
  ]
})
export class NoxAuthModule { }
