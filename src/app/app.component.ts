import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LayoutPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEstadistica';
}
