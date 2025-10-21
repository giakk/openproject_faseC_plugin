import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaseCDataComponent } from './fase-c-data.component';

@NgModule({
  declarations: [
    FaseCDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FaseCDataComponent,
  ],
})
export class FaseCDataModule { }