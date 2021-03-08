---
date: 2021-03-08
tags:
  - Angular
  - MaterialDesign
  - TailwindCSS
permalink: /blog/:slug
---

# Integrar Tailwind CSS con Angular Material en una aplicación Angular

<social-share class="social-share--header" />

Si todavía no sabes qué es Tailwind CSS, te recomiendo que le eches un vistazo a mi artículo sobre [¿Qué es Tailwind CSS?](./tailwind-css.md). Y si no conoces Material Design o Angular Material, también te sugiero que le eches un vistazo a este otro artículo sobre [¿Por qué usar Angular y Material Design?](./por-que-usar-angular-material-design.md) y donde planteo algunas de las ventajas de su uso.

## Instalación de Tailwind CSS en Angular

Ya es una realidad, desde la versión 11.2 de Angular **ya tenemos disponible el soporte nativo de Tailwind CSS en nuestras aplicaciones**, así que es muy sencillo empezar a disfrutar de sus ventajas:
1. Primero debemos asegurarnos de estar en la última versión de Angular, por lo que ejecutamos `ng update` para actualizar nuestra aplicación si no estamos en la versión 11.2 o superior.
   - Es posible que tengamos alertas que nos indiquen que debamos ejecutar por separado la actualización de Angular CLI con `ng update @angular/cli` (del que también deberemos tener la versión 11.2 o superior) y la de Angular Core con `ng update @angular/core`.
1. A continuación instalamos Tailwind CSS con el comando `npm install -D tailwindcss`
1. Creamos el fichero de configuración de Tailwind CSS _tailwind.config.js_ en la carpeta raíz de nuestra aplicación con el comando `npx tailwindcss init`.
1. Y finalmente importamos los estilos base a nuestro fichero _styles.scss_:
``` scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

Así de rápido, no hay más. A partir de ese momento ya podemos empezar a usar Tailwind CSS en nuestra aplicación:

``` html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
```
_app.component.html_

## Instalación de Angular Material

La instalación de Angular Material está completamente guiada a través de Angular CLI, por lo que al ejecutar el comando `ng add @angular/material` en nuestra aplicación, podremos instalar muy fácilmente todo lo necesario.

A continuación debemos importar los módulos de los componentes que queramos usar en nuestra aplicación:

``` ts
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
…
@NgModule ({....
  imports: [...,
  MatSliderModule,
  MatButtonModule,
…]
})
```

Y así poder empezar a usarlos en nuestros componentes:

``` html
<mat-slider min="1" max="100" step="1" value="1"></mat-slider>
<button mat-button>Basic</button>
```
_app.component.html_

## Incompatibilidades entre Tailwind CSS y Angular Material

Una vez tengamos los dos sistemas de diseño en una misma aplicación, podremos encontrarnos con que determinados estilos de ambos sistemas se vean afectados el uno por el otro.

En el caso de que queramos dar prioridad a los estilos de Tailwind CSS, tenemos la posibilidad de establecer que las propiedades de sus clases tengan preferencia mediante el siguiente ajuste en el fichero _tailwind.config.js_ creado en la carpeta raíz de nuestra aplicación:

``` js
module.exports = {
  important: true,
  ...
}
```
_tailwind.config.js_

Si por el contrario lo que queremos es priorizar las clases de Angular Material, debemos reescribir los estilos de Tailwind CSS que no queramos que nos afecten o inclusive usar sus propias clases para _proteger_ los estilos de los componentes de Angular Material.

Esto nos puede ocurrir por ejemplo con los botones, donde la clase base de Tailwind CSS siempre les agregará un contorno cuando reciban el foco:

``` css
button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}
```

Así que podremos reescribir dicho estilo en nuestro fichero _styles.scss_ estableciendo el valor deseado:

``` scss
button:focus {
  outline: 0;
}
```
_styles.scss_

O inclusive usando una clase predefinida de Tailwind:

``` scss
button:focus {
  @apply outline-none;
}
```
_styles.scss_

También cabría la posibilidad de usar una clase propia de Tailwind CSS en nuestro control para evitar dicho efecto en nuestro botón de Angular Material:

``` html
<button mat-button class="focus:outline-none">Basic</button>
```

Y para terminar, la que quizás sea la vía más interesante para evitar los problemas de compatibilidad entre ambos sistemas (y seguramente la más acertada para proyectos ya existentes o de los cuales queremos controlar las clases base), es deshabilitar por completo los estilos _preflight_ (son los estilos creados para suavizar las inconsistencias entre navegadores) de Tailwind CSS con la siguiente modificación en el fichero _tailwind.config.js_:

``` js
module.exports = {
  ...,
  corePlugins: {
    preflight: false,
  },
  ...
}
```
_tailwind.config.js_

---
<social-share class="social-share--footer" />
