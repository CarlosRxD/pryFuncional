import { Component, ViewEncapsulation } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { StatisticsService } from '../../services/statistics.service';
@Component({
  selector: 'app-calculadora',
  imports: [TabViewModule,CommonModule, FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CalculadoraComponent {
  // Pestaña seleccionada: 'descriptivas', 'asociativas' o 'conteo'
  selectedTab: 'descriptivas' | 'asociativas' | 'conteo' = 'descriptivas';

  // Para Medidas Descriptivas
  dataInput: string = '';

  // Para Medidas Asociativas
  dataInputX: string = '';
  dataInputY: string = '';

  // Para Técnicas de Conteo
  nValue?: number;
  rValue?: number;

  // Operación actual (se extiende el union según pestaña)
  operation: 'mean' | 'median' | 'mode' | 'variance' | 'stddev' |
             'covariance' | 'correlation' | 'corrcoef' |
             'permutation' | 'combination' = 'mean';

  result: number | number[] | null = null;
  errorMessage = '';
  chartData: any;
  loading = false;

  constructor(private statsService: StatisticsService) {}

  // Método genérico para parsear una cadena de números separados por comas
  parseInput(input: string): number[] {
    if (!input.trim()) return [];
    return input.split(',')
      .map((num: string) => {
        const parsed = parseFloat(num.trim());
        if (isNaN(parsed)) throw new Error('Valores inválidos detectados');
        return parsed;
      });
  }

  calculate() {
    this.loading = true;
    this.errorMessage = '';
    
    try {
      if (this.selectedTab === 'descriptivas') {
        // Parsea la entrada de datos (lista de números)
        const numbers = this.parseInput(this.dataInput);
        if (numbers.length === 0) {
          this.errorMessage = 'Ingresa números válidos separados por comas';
          this.loading = false;
          return;
        }
        // Selecciona la operación según la opción elegida
        switch (this.operation) {
          case 'mean':
            this.statsService.calcularMedia(numbers).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'median':
            this.statsService.calcularMediana(numbers).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'mode':
            this.statsService.calcularModa(numbers).subscribe({
              next: (res: number[]) => this.result = res,
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'variance':
            this.statsService.calcularVarianza(numbers).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'stddev':
            this.statsService.calcularDesviacion(numbers).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          default:
            this.errorMessage = 'Operación no válida para medidas descriptivas';
        }
      } else if (this.selectedTab === 'asociativas') {
        // Parsea las dos listas de datos
        const numbersX = this.parseInput(this.dataInputX);
        const numbersY = this.parseInput(this.dataInputY);
        if (numbersX.length === 0 || numbersY.length === 0) {
          this.errorMessage = 'Ingresa datos válidos para X e Y';
          this.loading = false;
          return;
        }
        switch (this.operation) {
          case 'covariance':
            this.statsService.calcularCovarianza(numbersX, numbersY).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'correlation':
            this.statsService.calcularCorrelacion(numbersX, numbersY).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'corrcoef':
            this.statsService.calcularCoeficienteCorrelacion(numbersX, numbersY).subscribe({
              next: (res: number) => this.result = Number(res.toFixed(2)),
              error: (err: any) => this.handleError(err)
            });
            break;
          default:
            this.errorMessage = 'Operación no válida para medidas asociativas';
        }
      } else if (this.selectedTab === 'conteo') {
        // Se requieren valores para n y r
        if (this.nValue === undefined || this.rValue === undefined) {
          this.errorMessage = 'Ingresa valores para n y r';
          this.loading = false;
          return;
        }
        switch (this.operation) {
          case 'permutation':
            this.statsService.calcularPermutacion(this.nValue, this.rValue).subscribe({
              next: (res: number) => this.result = res,
              error: (err: any) => this.handleError(err)
            });
            break;
          case 'combination':
            this.statsService.calcularCombinacion(this.nValue, this.rValue).subscribe({
              next: (res: number) => this.result = res,
              error: (err: any) => this.handleError(err)
            });
            break;
          default:
            this.errorMessage = 'Operación no válida para técnicas de conteo';
        }
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  private handleError(error: any) {
    console.error('Error:', error);
    if (typeof error === 'string') {
      this.errorMessage = error;
    } else if (error.error?.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'Error desconocido al realizar el cálculo';
    }
    this.result = null;
  }
  handleCsvUploadDescriptivas(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text: string = e.target.result;
      // Separamos el contenido por líneas
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      let numbers: string[] = [];
      lines.forEach(line => {
        // Si la línea contiene comas, separamos por comas; de lo contrario, se toma la línea completa
        if (line.indexOf(',') !== -1) {
          numbers.push(...line.split(',').map(val => val.trim()).filter(val => val !== ''));
        } else {
          numbers.push(line.trim());
        }
      });
      // Asignamos los números al input (como cadena separada por comas)
      this.dataInput = numbers.join(', ');
    };
    reader.readAsText(file);
  }

  // Método para manejar el archivo CSV en el tab de Medidas Asociativas (se espera dos columnas)
  handleCsvUploadAsociativas(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text: string = e.target.result;
      // Separamos el contenido por líneas
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      let columnX: string[] = [];
      let columnY: string[] = [];
      lines.forEach(line => {
        const values = line.split(',').map(val => val.trim()).filter(val => val !== '');
        if (values.length >= 2) {
          columnX.push(values[0]);
          columnY.push(values[1]);
        } else {
          // Si la línea no tiene al menos dos columnas, se ignora o se puede asignar un mensaje de error
          this.errorMessage = 'El archivo CSV debe contener al menos dos columnas para medidas asociativas';
        }
      });
      if (columnX.length && columnY.length) {
        this.dataInputX = columnX.join(', ');
        this.dataInputY = columnY.join(', ');
      }
    };
    reader.readAsText(file);
  }

  formatResult(): string {
    if (this.result === null) return '';
    if (Array.isArray(this.result)) {
      return `Moda: ${this.result.join(', ')}`;
    }
    return `Resultado: ${this.result}`;
  }
}