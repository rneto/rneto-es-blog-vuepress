---
date: 2020-9-23
tags:
  - algoritmo
  - typescript
  - patron-de-diseno
permalink: /:slug
---

# Implementaciones del algoritmo QuickSort y uso del patrón Bridge con TypeScript

<social-share class="social-share--header" />

## Algoritmo Quicksort

El algoritmo de ordenación [Quicksort](https://en.wikipedia.org/wiki/Quicksort), consiste en tomar como referencia un elemento de la lista (al que se denomina _pivote_) y dividirla en dos nuevas sublistas, una con los elementos menores al elemento de referencia y otra con los elementos mayores al elemento de referencia (los elementos iguales se ubicarian en cualquiera de las dos listas, según su implementación). Seguidamente dividiremos recursivamente con el mismo método cada sublista hasta ordenar toda la lista.

La eficiencia del algoritmo depende principalmente de la técnica usada para la elección del pivote y de la técnica de reposicionamiento de los elementos.

## Patrón Bridge

El [patrón Bridge](https://en.wikipedia.org/wiki/Bridge_pattern) es uno de los 23 patrones presentados y definidos por The Gang of Four (GOF) en el libro "Design Patterns: Elements of Reusable Object-Oriented Software" y forma parte de la categoría de patrones estructurales. Este patrón se usa para desacoplar una abstracción de su implementación, de modo que las dos puedan variar de forma independiente.

Si consideramos nuestro algoritmo de ordenación como una clase abstracta basada en el principio de _Divide y vencerás_ (_Divide and conquer_ en inglés) donde rompemos y ordenamos la matriz de manera recursiva, podríamos tener diferentes implementaciones de ordenación, tanto para el algoritmo Quicksort, como para otros algoritmos basados en el mismo principio como [Merge sort](https://en.wikipedia.org/wiki/Merge_sort) o [Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) entre otros. Es por ello que he considerado usar el patrón Bridge como solución para esta demostración.

## Interfaz de comportamiento: _la implementación_

Empezaremos por definir la interfaz que describe el comportamiento específico de nuestra necesidades, en nuestro caso, el algoritmo de ordenación. A partir de ella definiremos múltiples implementaciones concretas que se adaptarán al contrato definido por la interfaz.

``` ts
export interface SorterAlgorithmInterface {
    sort(numbers: number[], low: number, hight: number): void;
}
```
_sorter-algorithm.interface.ts_

## Divide y vencerás: _la abstracción_

En segundo lugar definiremos la clase que ofrece el API de ordenación. Será una clase creada como abstracta y que tendrá una referencia a la implementación a través de una propiedad en la clase, por lo que no conocerá los detalles de dicha implementación de ordenación.

``` ts
import { SorterAlgorithmInterface } from '.';

export abstract class DivideConquerSorter {
  sorterAlgorithm: SorterAlgorithmInterface;

  /**
   * Constructor for a sorter service.
   *
   * @param sorterAlgorithm The sorter algorithm implementation to apply.
   */
  constructor(sorterAlgorithm: SorterAlgorithmInterface) {
    this.sorterAlgorithm = sorterAlgorithm;
  }

  /**
   * Sort service method.
   * @param numbers The numbers to sort.
   */
  sort(numbers: number[]): void {
    if (numbers.length > 1) {
      this.sorterAlgorithm.sort(numbers, 0, numbers.length - 1);
    }
  }
}
```
_divide-conquer.sorter.ts_

## Quicksort de ordenación: _extendiendo la abstracción_

Ahora vamos a crear la clase de ordenación Quisort sin modificar la implementación de la clase para simplificar el ejemplo, sin embaro podríamos hacer operaciones adicionales específicas a nuestras necesidades.

``` ts
import { DivideConquerSorter } from '.';

export class QuicksortSorter extends DivideConquerSorter {
}
```
_quicksort.sorter.ts_

## Básica & Lomuto & nativa: _creando implementaciones_

Con el objetivo de comparar el rendimiento de diferentes implementaciones, he creado tres algoritmos distintos de ordenación basados en el mismo principio de _divide y vencerás_.

1. En base al esquema de ordenación de [Lomuto](https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme).
1. En base a la ordenación nativa de Chrome v8, el cual usa Quicksort para la implementación de _Array.sort_.
1. En base a una interpretación básica de dicho principio de ordenación.

``` ts
import { SorterAlgorithmInterface } from '.';

/**
 * Basic quicksort algorithm implementation.
 */
export class BasicQuicksort implements SorterAlgorithmInterface {
  sort(numbers: number[]): void {
    if (numbers.length <= 1) {
      return;
    }

    const pivot = numbers[numbers.length - 1];
    const left = numbers.filter((n) => n < pivot);
    const right = numbers.filter((n) => n > pivot);

    this.sort(left);
    this.sort(right);

    numbers.splice(
      0,
      numbers.length,
      ...left,
      ...numbers.filter((n) => n === pivot),
      ...right,
    );
  }
}
```
_basic-quicksort.ts_

``` ts
import { SorterAlgorithmInterface } from '.';

/**
 * Lomuto quicksort algorithm implementation.
 */
export class LomutoQuicksort implements SorterAlgorithmInterface {
  sort(numbers: number[], low: number, hight: number): void {
    if (low < hight) {
      const p = this.partition(numbers, low, hight);

      this.sort(numbers, low, p - 1);
      this.sort(numbers, p + 1, hight);
    }
  }

  private partition(numbers: number[], low: number, hight: number): number {
    const pivot: number = numbers[hight];
    let i: number = low;
    for (let j: number = low; j <= hight; j += 1) {
      if (numbers[j] < pivot) {
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        i += 1;
      }
    }
    if (numbers[hight] < numbers[i]) {
      [numbers[i], numbers[hight]] = [numbers[hight], numbers[i]];
    }
    return i;
  }
}
```
_lomuto-quicksort.ts_

``` ts
import { SorterAlgorithmInterface } from '.';

/**
 * Native quicksort algorithm implementation.
 * Chrome v8 uses QuickSort for Array.sort implementation.
 */
export class NativeQuicksort implements SorterAlgorithmInterface {
  sort(numbers: number[]): void {
    if (numbers.length <= 1) {
      return;
    }

    numbers = numbers.sort((a, b) => a - b);
  }
}
```
_native-quicksort.ts_

## Cliente: _uso de las implementaciones_

Ya podemos hacer uso de nuestras clases y encajar todas las piezas.

``` ts
import { QuicksortSorter, BasicQuicksort, LomutoQuicksort, NativeQuicksort } from '.';

const numbers: numbers[] = [1, -10, 4, 5, -1515, 3, 3, 3, 0, 0, 200];

const basicQuicksort: BasicQuicksort = new BasicQuicksort();
const lomutoQuicksort: LomutoQuicksort = new LomutoQuicksort();
const nativeQuicksort: NativeQuicksort = new NativeQuicksort();

const quickSorterServiceWithBasic: QuicksortSorter = new QuicksortSorter(basicQuicksort);
const quickSorterServiceWithLomuto: QuicksortSorter = new QuicksortSorter(lomutoQuicksort);
const quickSorterServiceWithNative: QuicksortSorter = new QuicksortSorter(nativeQuicksort);

quickSorterServiceWithBasic.sort(numbers);
quickSorterServiceWithLomuto.sort(numbers);
quickSorterServiceWithNative.sort(numbers);
```
_index.ts_

## Ejemplo completo con prueba de rendimiendo

Puedes acceder al proyecto que he creado con un [ejemplo práctico de implementaciones del algoritmo Quicksort y uso del patrón Bridge con TypeScript](https://github.com/rneto/ts-quicksort-bridge) en GitHub.

---
<social-share class="social-share--footer" />