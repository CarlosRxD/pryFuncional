import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-home',
  imports: [DialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  displayProbabilidadDialog: boolean = false;
  displayFormulasDialog: boolean = false;
  displayAplicacionesDialog: boolean = false;
  constructor(private router: Router) {}
  // Métodos para abrir cada modal
  openProbabilidadDialog() {
    this.displayProbabilidadDialog = true;
  }

  openFormulasDialog() {
    this.displayFormulasDialog = true;
  }

  openAplicacionesDialog() {
    this.displayAplicacionesDialog = true;
  }
  openCalculadora() {
    this.router.navigate(['/calculadora']); 
  }
}