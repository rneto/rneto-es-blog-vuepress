---
date: 2021-10-3
tags:
  - Angular
  - AngularMaterial
  - Sass
permalink: /blog/:slug
---

# Crear un tema para Angular Material

<social-share class="social-share--header" />

Angular Material dispone de un sistema de generación de temas que permite la configuración de aspectos de color y tipografía de sus componentes. Dicho sistema ofrece diferentes alternativas de configuración basadas en características de _Sass_ que veremos a continuación.

> Es importante destacar que me he basado en las recomendaciones de angular Material para la versión 12, siendo la última revisión disponible en el momento de creación del artículo la 12.2.8.

Si todavía no estás convencido de usar Angular Material, te recomiendo que le eches un vistazo a mi artículo sobre [¿Por qué usar Angular y Material Design?](/blog/por-que-usar-angular-material-design/)

Y si ya estás convencido, pero no sabes por dónde empezar, te puedo ayudar a saber [cómo instalar Angular Material](/blog/instalar-angular-material/).

## ¿Qué es Sass?

Saas (Syntactically Awesome Style Sheets) es una extensión de CSS que nos permite definir y usar variables, reglas anidadas, funciones de estilos reutilizables (_mixins_) e importaciones entre otras características, y que una vez procesados dan como resultado los ficheros CSS que serán publicados como parte de nuestra aplicación. Podríamos decir que Sass es a CSS lo que TypeScript es a JavaScript.

## Paleta de colores en Angular Material

Una paleta de colores en Angular Material se define como una colección de colores (llamados tonos) que representan una escala de tonalidades. Dicha escala se complementa con una colección adicional de colores de contraste, que son usados en los textos cuando el tono es usado como fondo. La definición de una paleta se realiza mediante la creación de mapas Sass con la siguiente estructura y consiguiente uso:

``` scss
$custom-primary-map: (
    50 : #e8eaf6,
    100 : #c5cbe9,
    200 : #9fa8da,
    300 : #7985cb,
    400 : #5c6bc0,
    500 : #3f51b5,
    600 : #394aae,
    700 : #3140a5,
    800 : #29379d,
    900 : #1b278d,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #000000,
        400 : #ffffff,
        500 : #ffffff,
        600 : #ffffff,
        700 : #ffffff,
        800 : #ffffff,
        900 : #ffffff,
    )
);

$primary-palette: mat.define-palette($custom-primary-map);
```
_styles.scss_

En el mapa de tonos podemos apreciar la escala de colores desde la más clara (50) hasta la más oscura (900).

En algunas paletas podemos encontrarnos con tonos numerados como A100, A200, A400 y A700, pero Angular Material no los requiere por lo que en esta ocasión los vamos a obviar.

> Si queremos simplificar el proceso de creación de los mapas de colores para nuestras paletas, podemos usar el repositorio de [Material Design Color Generator](https://github.com/mbitson/mcg). Una vez accedamos a la herramienta, debemos usar la opción de exportación llamada _Angular JS 2 (Material 2)_ ya que como podemos comprobar, permite exportar las paletas a diferentes formatos.

Del mismo modo que hemos visto cómo generar nuestras paletas personalizadas, también es posible hacer uso de cualquiera de las [paletas de Material Design](https://material.io/archive/guidelines/style/color.html#color-color-palette) incluidas en el paquete. Para ello basta incluirlas en nuestro fichero de la siguiente manera:

``` scss
@use '~@angular/material' as mat;

$primary-palette: mat.define-palette(mat.$teal-palette);
$accent-palette: mat.define-palette(mat.$lime-palette);
$warn-palette: mat.define-palette(mat.$deep-orange-palette);
```
_styles.scss_

Otra opción también consiste en generar una paleta derivada de un tono de una paleta de Material Design:

``` scss
@use '~@angular/material' as mat;

$primary-palette: mat.define-palette(mat.$teal-palette, 200);
$accent-palette: mat.define-palette(mat.$lime-palette, 200);
$warn-palette: mat.define-palette(mat.$deep-orange-palette, 200);
```
_styles.scss_

## Temas personalizados en Angular Material

Lo primero que debemos definir para la creación de un tema es el conjunto de las tres paletas de colores de las que estará compuesto y que son las siguientes (si obviamos la tercera -_warn_-, se usará el rojo automáticamente, por lo que podrían ser solamente dos):

- **Primaria** (_primary_): es paleta para el color más común en la aplicación.
- **Secundaria** (_accent_): es la paleta para el color usado para destacar determinadas partes de la aplicación.
- **Advertencia** (_warn_): es la paleta usada para advertencias y errores en la aplicación.

¿Cómo hacemos uso de las paletas creadas?

``` scss
@use '~@angular/material' as mat;

// Incluimos los estilos comunes de Angular Material
@include mat.core();

// Definimos los mapas de colores personalizados
$custom-primary-map: (
    50 : #e8eaf6,
    ...,
    contrast: (
        50 : #000000,
        ...,
    )
);

$custom-accent-map: (
    50 : #f9fbe7,
    ...,
    contrast: (
        50 : #000000,
        ...,
    )
);

$custom-warm-map: (
    50 : #f6e7e7,
    ...,
    contrast: (
        50 : #000000,
        ...,
    )
);

// Definimos las paletas basadas en los mapas de colores personalizados
$primary-palette: mat.define-palette($custom-primary-map);
$accent-palette: mat.define-palette($custom-accent-map);
$warm-palette: mat.define-palette($custom-warm-map);

// Creamos el objeto del tema personalizado claro (podríamos crear otro para el modo oscuro)
$custom-theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette
  )
));

// Y finalmente incluimos los estilos del tema en todos nuestros componentes
@include mat.all-component-themes($custom-theme);

// También podríamos aplicar el tema exclusivamente a los componentes que deseáramos
// @include mat.button-theme($custom-theme);
```
_styles.scss_

Además de la configuración de colores podemos realizar la configuración de la tipografía de nuestro tema. Para ello será necesario usar la función Sass _define-typography-config_ para crear una la configuración que pasaremos al _mixin_ _core_ al principio de nuestro fichero Sass:

``` scss
@use '~@angular/material' as mat;

// Tipografía personalizada
$custom-typography: mat.define-typography-config(
  $font-family:   'Roboto, sans-serif',
  $display-4:     mat.define-typography-level(112px, 112px, 300, $letter-spacing: -0.05em),
  $display-3:     mat.define-typography-level(56px, 56px, 400, $letter-spacing: -0.02em),
  $display-2:     mat.define-typography-level(45px, 48px, 400, $letter-spacing: -0.005em),
  $display-1:     mat.define-typography-level(34px, 40px, 400),
  $headline:      mat.define-typography-level(34px, 32px, 400),
  $title:         mat.define-typography-level(24px, 32px, 500),
  $subheading-2:  mat.define-typography-level(20px, 28px, 400),
  $subheading-1:  mat.define-typography-level(15px, 24px, 400),
  $body-2:        mat.define-typography-level(16px, 28px, 500),
  $body-1:        mat.define-typography-level(16px, 28px, 400),
  $caption:       mat.define-typography-level(14px, 20px, 400),
  $button:        mat.define-typography-level(16px, 16px, 400),
  $input:         mat.define-typography-level(inherit, 1.125, 400)
);

@include mat.core($custom-typography);

// A esto habría que añadir el resto de la configuración del tema en cuanto a colores
```

> No nos olvidemos de incluir cuando sea necesario la fuente que usemos, bien como un enlace en el fichero _index.html_ o como importación en el fichero Sass.

## Temas predefinidos en Angular Material

Angular material también ofrece una serie de temas predefinidos que podemos usar directamente en nuestra aplicación.

Tema | Paletas (primary, accent, warn)
--------|----------------------------
deeppurple-amber.css | deep-purple, amber, red
indigo-pink.css | indigo, pink, red
pink-bluegray.css | pink, bluegray, red
purple-green.css | purple, green, red

Para usarlos, basta con incluir en nuestro fichero _angular.json_ una referencia al CSS correspondiente al tema que queramos usar, tanto a las secciones _architect.build.options.styles_ como _architect.test.options.styles_:

``` json
…,
  "architect": {
    "build": {
      ...,
      "options": {
        ...,
        "styles": [
          "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
          "src/styles.scss"
        ],
        ...
      },
      ...
    },
    ...,
    "test": {
      ...,
      "options": {
        ...,
        "styles": [
          "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
          "src/styles.scss"
        ],
        ...
      }
    },
…,

```

## Aplicar tipografía de Angular Material a la aplicación

Si deseamos aplicar la tipografía de Angular Material a toda la aplicación (más allá de los componentes de angular Material), debemos añadir la clase _mat-typography_ al elemento _body_ del fichero _index.html_ de la aplicación.

---
<social-share class="social-share--footer" />
