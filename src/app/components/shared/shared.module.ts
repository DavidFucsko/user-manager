import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { DataCardComponent } from './/data-card/data-card.component';



@NgModule({
  declarations: [TabsComponent, DataCardComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
