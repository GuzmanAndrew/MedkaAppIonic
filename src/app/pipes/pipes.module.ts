import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayDatesPipe } from './display-dates.pipe';
import { GroupDatesPipe } from './group-dates.pipe';

@NgModule({
  declarations: [
    DisplayDatesPipe,
    GroupDatesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DisplayDatesPipe,
    GroupDatesPipe,
  ],
})
export class PipesModule { }
