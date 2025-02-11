import { Routes } from '@angular/router';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'calculadora', component: CalculadoraComponent },
    { path: 'sobre-nosotros', component: SobreNosotrosComponent },
    { path: 'ayuda', component: AyudaComponent },
    { path: '**', redirectTo: '' }  // Ruta comodín: redirige a Home para rutas desconocidas
  ];
