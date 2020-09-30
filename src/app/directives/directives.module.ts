import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkerDirective } from './marker.directive';

@NgModule({
  declarations: [MarkerDirective],
  imports: [
    CommonModule
  ],
  exports: [MarkerDirective]
})
export class DirectivesModule { }
