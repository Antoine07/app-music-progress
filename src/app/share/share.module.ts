import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // directive classique comme *ngIf ...
import { PaginateComponent } from '../paginate/paginate.component';

@NgModule({
  imports: [
    CommonModule // pour les directives dans les components partagés
  ],
  // Pour rendre accessible dans les autres modules 
  // les components il faut les déclarer et les exporter
  declarations: [PaginateComponent], // on utilise les directives de CommonModule
  exports : [PaginateComponent] 
})
export class ShareModule { }