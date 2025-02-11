import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  imports: [CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
   // Conjunto de códigos para Medias Descriptivas
   codigoMediasDescriptivas: string = `
   public static double media(List<Double> lista) {
       validarListaNoVacia(lista);
       return lista.stream()
                   .mapToDouble(Double::doubleValue)
                   .average()
                   .orElse(0.0);
   }
   
   public static double varianza(List<Double> lista) {
       validarListaNoVacia(lista);
       double ml = media(lista);
       return lista.stream()
                   .mapToDouble(x -> Math.pow(x - ml, 2))
                   .sum() / (lista.size() - 1);
   }
   
   public static double desviacion(List<Double> lista) {
       return Math.sqrt(varianza(lista));
   }
   `;
 
   // Conjunto de códigos para Medidas Asociativas
   codigoMedidasAsociativas: string = `
   public static double covarianza(List<Double> xs, List<Double> ys) {
       validarListasCovarianza(xs, ys);
       double mx = media(xs);
       double my = media(ys);
       
       double suma = 0.0;
       for (int i = 0; i < xs.size(); i++) {
           suma += (xs.get(i) - mx) * (ys.get(i) - my);
       }
       return suma / xs.size();
   }
   
   public static double correlacion(List<Double> xs, List<Double> ys) {
       validarListasCovarianza(xs, ys);
       double cov = covarianza(xs, ys);
       double stdx = desviacion(xs);
       double stdy = desviacion(ys);
       
       return cov / (stdx * stdy);
   }
   `;
 
   // Conjunto de códigos para Técnicas de Conteo
   codigoTecnicasConteo: string = `
   public static int factorial(int n) {
       if (n < 0) throw new IllegalArgumentException("n no puede ser negativo");
       int result = 1;
       for (int i = 2; i <= n; i++){
           result *= i;
       }
       return result;
   }
   
   public static int permutacion(int n, int r) {
       validarParametrosCombinatoria(n, r);
       return factorial(n) / factorial(n - r);
   }
   
   public static int combinacion(int n, int r) {
       validarParametrosCombinatoria(n, r);
       return factorial(n) / (factorial(n - r) * factorial(r));
   }
   `;
  codigoEstadisticaDescriptiva: string = `
  public static double media(List<Double> lista) {
      validarListaNoVacia(lista);
      return lista.stream()
                  .mapToDouble(Double::doubleValue)
                  .average()
                  .orElse(0.0);
  }
  
  public static double varianza(List<Double> lista) {
      validarListaNoVacia(lista);
      double ml = media(lista);
      return lista.stream()
                  .mapToDouble(x -> Math.pow(x - ml, 2))
                  .sum() / (lista.size() - 1);
  }
  
  public static double desviacion(List<Double> lista) {
      return Math.sqrt(varianza(lista));
  }
    `;
  
    // Fragmento para Factorial, Permutación y Combinación
    codigoCombinatoria: string = `
  public static int factorial(int n) {
      if (n < 0) throw new IllegalArgumentException("n no puede ser negativo");
      int result = 1;
      for (int i = 2; i <= n; i++){
          result *= i;
      }
      return result;
  }
  
  public static int permutacion(int n, int r) {
      validarParametrosCombinatoria(n, r);
      return factorial(n) / factorial(n - r);
  }
  
  public static int combinacion(int n, int r) {
      validarParametrosCombinatoria(n, r);
      return factorial(n) / (factorial(n - r) * factorial(r));
  }
    `;
  
    // Fragmento para Mediana
    codigoMediana: string = `
  public static double mediana(List<Double> lista) {
      validarListaNoVacia(lista);
      List<Double> ordenada = lista.stream()
              .sorted()
              .collect(Collectors.toList());
      int n = ordenada.size();
      if (n % 2 == 1) {
          return ordenada.get(n / 2);
      } else {
          return (ordenada.get(n / 2 - 1) + ordenada.get(n / 2)) / 2.0;
      }
  }
    `;
  
    // Fragmento para Covarianza
    codigoCovarianza: string = `
  public static double covarianza(List<Double> xs, List<Double> ys) {
      validarListasCovarianza(xs, ys);
      double mx = media(xs);
      double my = media(ys);
      
      double suma = 0.0;
      for (int i = 0; i < xs.size(); i++) {
          suma += (xs.get(i) - mx) * (ys.get(i) - my);
      }
      return suma / xs.size();
  }
    `;
  
    // Fragmento para Moda
    codigoModa: string = `
  public static List<Double> moda(List<Double> lista) {
      validarListaNoVacia(lista);
      Map<Double, Long> frecuencia = lista.stream()
              .collect(Collectors.groupingBy(x -> x, Collectors.counting()));
  
      long maxFrecuencia = Collections.max(frecuencia.values());
      return frecuencia.entrySet().stream()
              .filter(entry -> entry.getValue() == maxFrecuencia)
              .map(Map.Entry::getKey)
              .collect(Collectors.toList());
  }
    `;
  
    // Fragmento para Correlación
    codigoCorrelacion: string = `
  public static double correlacion(List<Double> xs, List<Double> ys) {
      validarListasCovarianza(xs, ys);
      double cov = covarianza(xs, ys);
      double stdx = desviacion(xs);
      double stdy = desviacion(ys);
      
      return cov / (stdx * stdy);
  }
    `;
    codigoSeleccionado: string | null = null;

    mostrarCodigo(codigo: string) {
      this.codigoSeleccionado = this.codigoSeleccionado === codigo ? null : codigo;
    }
}
