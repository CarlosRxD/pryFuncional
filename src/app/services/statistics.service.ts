import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8080/api/statistics';

  constructor(private http: HttpClient) { }

  calcularMedia(numeros: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/media`, numeros)
      .pipe(
        catchError(error => {
          throw 'Error al calcular la media: ' + error;
        })
      );
  }

  calcularVarianza(numeros: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/varianza`, numeros)
      .pipe(
        catchError(error => {
          throw 'Error al calcular la varianza: ' + error;
        })
      );
  }

  calcularDesviacion(numeros: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/desviacion`, numeros)
      .pipe(
        catchError(error => {
          throw 'Error al calcular la desviación estándar: ' + error;
        })
      );
  }

  calcularFactorial(numero: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/factorial`, { numero })
      .pipe(
        catchError(error => {
          throw 'Error al calcular el factorial: ' + error;
        })
      );
  }

  calcularPermutacion(n: number, r: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/permutacion`, { n, r })
      .pipe(
        catchError(error => {
          throw 'Error al calcular la permutación: ' + error;
        })
      );
  }

  calcularCombinacion(n: number, r: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/combinacion`, { n, r })
      .pipe(
        catchError(error => {
          throw 'Error al calcular la combinación: ' + error;
        })
      );
  }

  calcularMediana(numeros: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/mediana`, numeros)
      .pipe(
        catchError(error => {
          throw 'Error al calcular la mediana: ' + error;
        })
      );
  }

  calcularCovarianza(xs: number[], ys: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/covarianza`, { xs, ys })
      .pipe(
        catchError(error => {
          throw 'Error al calcular la covarianza: ' + error;
        })
      );
  }

  calcularModa(numeros: number[]): Observable<number[]> {
    return this.http.post<number[]>(`${this.apiUrl}/moda`, numeros)
      .pipe(
        catchError(error => {
          throw 'Error al calcular la moda: ' + error;
        })
      );
  }
  calcularCorrelacion(xs: number[], ys: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/correlacion`, { xs, ys })
      .pipe(
        catchError(error => {
          throw 'Error al calcular la correlación: ' + error;
        })
      );
  }

  calcularCoeficienteCorrelacion(xs: number[], ys: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/coeficiente-correlacion`, { xs, ys })
      .pipe(
        catchError(error => {
          throw 'Error al calcular el coeficiente de correlación: ' + error;
        })
      );
  }
}