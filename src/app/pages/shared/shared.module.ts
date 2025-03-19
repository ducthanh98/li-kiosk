import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EcoChargeApiModule} from '../../core/generated-service';

@NgModule({
  imports: [
    CommonModule,
    EcoChargeApiModule
  ],
})
export class SharedModule {}
