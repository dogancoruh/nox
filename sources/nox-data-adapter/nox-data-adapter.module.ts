import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoxCoreModule } from '../nox-core/nox-core.module';
import { RouterModule } from '@angular/router';
import { NoxDataAdapterComponent } from './components/nox-data-adapter.component';
import { NoxGenericDataAdapterComponent } from './components/nox-generic-data-adapter.component';
import { NoxServerDataAdapterComponent } from './components/nox-server-data-adapter';

@NgModule({
  declarations: [
    NoxDataAdapterComponent,
    NoxGenericDataAdapterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NoxCoreModule
  ],
  exports: [
    NoxDataAdapterComponent,
    NoxGenericDataAdapterComponent
  ],
  providers: [

  ]
})
export class NoxDataAdapterModule { }
