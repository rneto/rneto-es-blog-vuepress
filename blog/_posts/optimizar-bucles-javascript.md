---
date: 2020-6-4
tags:
  - javascript
  - es2015
permalink: /blog/:slug
---

# Optimizar bucles en JavaScript

<social-share class="social-share--header" />

Desde la especificación ECMAScript 2015, las operaciones con arrays de elementos se han visto potenciadas gracias a nuevos métodos de alto nivel como _map_, _filter_, _reduce_, _some_, _every_ o _forEach_ entre otros. Con ellos ganamos en entendimiento y depuración del código, pero no siempre son la mejor opción para optimizar el tiempo de ejecución de nuestros bucles.

Veremos a continuación algunas de las operaciones más comunes llevadas a cabo sobre los arrays usando tanto los métodos de alto nivel como su alternativa basada en bucles clásicos. Para finalizar, comprobaremos con un ejemplo práctico real el rendimiendo de todos los escenarios planteados.

## Recorrer todos los elementos de un array y obtener una nueva colección de elementos modificados

El método ```map()``` crea un nuevo array con los resultados de la función aplicada a cada uno de sus elementos.

Partiendo de un array de textos, vamos a convertir todos los textos en mayúsculas con el método ```map()``` y un bucle clásico ```for ()```.

``` js
let texts = ['js', 'html', 'css', '.net'];

// Método map
let mapTexts = texts.map(t => t.toUpperCase());

// Bucle for clásico
let forTexts = [];
for (let i=0; i < texts.length; i++) {
  forTexts[i] = texts[i].toUpperCase();
}
```

## Filtrar los elementos de un array a partir de una condición dada

El método ```filter()``` crea un nuevo array con todos los elementos que cumplan la condición de la función aplicada.

Partiendo de un array de textos, vamos a filtrar aquellos elementos que empiecen por el carácter _h_, usando tanto el método ```filter()``` como un bucle clásico ```for ()```.

``` js
let texts = ['js', 'html', 'css', '.net'];

// Método filter
let filterTexts = texts.filter(t => t.charAt(0) === 'h');

// Bucle for clásico
let forTexts = [];
for (let i=0; i < texts.length; i++) {
  if(texts[i].charAt(0) === 'h'){
    forTexts.push(texts[i]);
  }
}
```

## Reducir los elementos de un array a un único valor

El método ```reduce()``` aplica una función reductora que recorre de izquierda a derecha cada elemento de un array, devolviendo como resultado un único valor.

Partiendo de un array de números, vamos a reducir los elementos a su suma, usando tanto el método ```reduce()``` como un bucle clásico ```for ()```.

``` js
let numbers = [5, 10, 15];

// Método reduce
let reduceSum = numbers.reduce((a, b) => a + b);

// Bucle for clásico
let forSum = 0;
for (let i=0; i < numbers.length; i++) {
  forSum += numbers[i];
}
```

## Determinar si al menos un elemento del array cumple una determinada condición

El método ```some()``` determina si al menos un elemento del array cumple con la condición de la función aplicada.

Partiendo de un array de textos, vamos a comprobar si algún elemento es _.net_, usando tanto el método ```some()``` como un bucle clásico ```for ()```.

``` js
let texts = ['js', 'html', 'css', '.net'];

// Método some
let someResult = texts.some(t => t === '.net');

// Bucle for clásico
let forResult = false;
for (let i=0; i < texts.length; i++) {
  if(texts[i] === '.net'){
    forResult = true;
    break;
  }
}
```

## Determinar si todos los elementos del array cumplen una determinada condición

El método ```every()``` determina si todos los elementos del array cumplen con la condición de la función aplicada.

Partiendo de un array de textos, vamos a comprobar si todos los elementos tienen menos de 5 caracteres, usando tanto el método ```every()``` como un bucle clásico ```for ()```.

``` js
let texts = ['js', 'html', 'css', '.net'];

// Método every
let everyResult = texts.every(t => t.length  < 5);

// Bucle for clásico
let forResult = true;
for (let i=0; i < texts.length; i++) {
  if(texts[i].length >= 5){
    forResult = false;
    break;
  }
}
```

## Ejecutar una función por cada elemento del array

El método ```forEach()``` ejecuta la función indicada por cada uno de los elementos del array.

Partiendo de un array de textos, vamos a registrar en la consola cada uno de sus valores con el método ```forEach()``` y un bucle clásico ```for ()```.

``` js
let texts = ['js', 'html', 'css', '.net'];

// Método forEach
texts.forEach(t => console.log(t));

// Bucle for clásico
for (let i=0; i < texts.length; i++) {
  console.log(texts[i]);
}
```

## Ejemplo práctico de pruebas de rendimiendo con bucles y arrays en JavaScript

He creado en StackBlitz un proyecto TypeScript con un [ejemplo práctico de pruebas de rendimiento con bucles y arrays en JavaScript](https://stackblitz.com/edit/ts-testing-loops-with-arrays).

---
<social-share class="social-share--footer" />
