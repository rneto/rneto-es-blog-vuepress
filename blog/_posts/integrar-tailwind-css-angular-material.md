---
date: 2021-03-08
tags:
  - Angular
  - AngularMaterial
  - MaterialDesign
  - TailwindCSS
permalink: /blog/:slug
canonicalUrl: https://rafaelneto.dev/blog/integrar-tailwind-css-angular-material/
---

# Integrar Tailwind CSS en Angular y combinarlo con Material

<social-share class="social-share--header" />

Si todavía no sabes qué es Tailwind CSS, te recomiendo que le eches un vistazo a mi artículo sobre [¿Qué es Tailwind CSS?](/blog/tailwind-css/).

Si no conoces Material Design o Angular Material, también te sugiero que le eches un vistazo a este otro artículo sobre [¿Por qué usar Angular y Material Design?](/blog/por-que-usar-angular-material-design/) y donde planteo algunas de las ventajas de su uso.

Podríamos hacer uso de Tailwind CSS o Angular Material por separado, pero creo que en esta ocasión, se complementan perfectamente ya que podemos disponer de una serie de componentes avanzados como son los ofrecidos por Angular Material junto con un completo conjunto de herramientas adicionales como son las ofrecidas por Tailwind CSS.

Si todavía no tienes instalado Angular Material en tu aplicación, te sugiero que sigas esta pequeña guía de [instalación de Angular Material](/blog/instalar-angular-material/).

## Instalación de Tailwind CSS en Angular

Desde la versión 11.2 de Angular **ya está disponible el soporte nativo de Tailwind CSS**, así que es muy sencillo empezar a disfrutar de sus ventajas en nuestras aplicaciones:
1. En primer lugar debemos asegurarnos de estar en la versión 11.2 o superior de Angular. Podemos actualizarnos ejecutando `ng update` o siguiendo la [guía de actualización de Angular](https://update.angular.io/).
   - Si ejecutamos el comando `ng update`, es posible que tengamos alertas que nos indiquen que debemos ejecutar por separado la actualización de Angular CLI con `ng update @angular/cli` y Angular Core con `ng update @angular/core`.

        > Tengamos en cuenta que desde la versión 7 de Angular, las versiones principales de Angular Core y CLI están alineadas, por lo que ambas tienen que ser iguales si queremos usar Angular CLI para desarrollar nuestra aplicación.

   - Si simplemente queremos la versión intermedia más reciente de Angular 11, debemos ejecutar `ng update @angular/cli@11` y `ng update @angular/core@11`, o lo que sería lo mismo `ng update @angular/core@11 @angular/cli@11`.

        > Recordemos que las versiones intermedias son totalmente compatibles con las versiones intermedias anteriores por lo que no deberíamos de tener problemas al pasarnos por ejemplo de la versión 11.0.0 a la 11.2.4.

1. A continuación instalamos Tailwind CSS con el comando `npm install -D tailwindcss`.
1. Creamos el fichero de configuración de Tailwind CSS _tailwind.config.js_ en la carpeta raíz de nuestra aplicación con el comando `npx tailwindcss init`.
1. Configuramos Tailwind CSS para que elimine los estilos no utilizados en nuestra aplicación:
      ``` js
      module.exports = {
        purge: {
          enabled: true,
          content: ['./src/**/*.{html,ts}'],
        },
        ...
      }
      ```
      _tailwind.config.js_
1. Y finalmente importamos los estilos base a nuestro fichero _styles.scss_:
    ``` scss
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
    ```

A partir de ese momento ya podemos empezar a usar Tailwind CSS en nuestra aplicación:

``` html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
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
  corePlugins: {
    preflight: false,
  },
  ...
}
```
_tailwind.config.js_

---
<social-share class="social-share--footer" />
