import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from 'src/app/utils/pipe/truncate.pipe';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TruncatePipe, NavBarComponent, FooterComponent],
  exports: [TruncatePipe, NavBarComponent, FooterComponent]
})
export class SharedModule { }
