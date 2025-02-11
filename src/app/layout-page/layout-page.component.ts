import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  imports: [NavbarComponent,RouterModule],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

}
