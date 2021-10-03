---
date: 2021-10-3
tags:
  - Angular
  - AngularMaterial
permalink: /blog/:slug
---

# Instalar Angular Material

<social-share class="social-share--header" />

La instalación de [Angular Material](https://material.angular.io/) está completamente guiada a través de Angular CLI, por lo que al ejecutar el comando `ng add @angular/material` en nuestra aplicación, podremos instalar todo lo necesario.

Una de las partes más importantes de la instalación es aquella en la que se nos pregunta por el tema que queremos usar en nuestra aplicación. Para ello, el instalador nos ofrece la posibilidad de seleccionar alguno de los temas predefinidos (_Indigo/Pink_, _Deep Purple/Amber_, _Pink/Blue Grey_ o _Purple/Green_) o nuestro propio tema personalizado.

Además del tema, también se nos preguntará por si queremos que la tipografía de Angular Material se aplique a toda la aplicación y si queremos habilitar las animaciones para Angular Material.

Una vez completada la instalación, se habrán producido los siguientes cambios en nuestro proyecto:

- Se habrán añadido todas las dependencias necesarias al fichero _package.json_.
- Si hemos seleccionado usar un tema predefinido, se habrá modificado el fichero _angular.json_ para incluirse la hoja de estilos correspondiente (por ejemplo _"./node_modules/@angular/material/prebuilt-themes/pink-bluegrey.css"_) en las listas de estilos de las secciones _architect.build.options.styles_ y  _architect.test.options.styles_.
- Si en su lugar, hemos seleccionado usar un tema personalizado, se habrá modificado el fichero _styles.scss_ para la inclusión de un tema personalizado de ejemplo basado en el tema _Indigo/Pink_ para que hagamos los cambios que necesitemos para nuestro tema.
- Al fichero _styles.scss_ se habrán añadido los estilos básicos para los elementos _html_ y _body_.
- Al fichero _index.html_ se habrán agregados las referencias necesarias a las fuentes de Google.
- Si hemos seleccionado aplicar la tipografía de Angular Material a toda la aplicación, se habrá agregado la clase _mat-typography_ al elemento _body_ del fichero _index.html_.
- Si hemos seleccionado habilitar las animaciones de Angular Material, al fichero _app.module.ts_ se habrá añadido el módulo _BrowserAnimationsModule_ a nuestras importaciones, en caso contrario, se habrá añadido el módulo _NoopAnimationsModule_.


Una vez tengamos todo configurado, ya podemos hacer uso de Angular Material y empezar a importar los módulos de los componentes que queramos incluir en nuestra aplicación:

``` ts
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
…
const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule
];

@NgModule ({....
  imports: [...,
  ...materialModules
  ]
})
```
_app.module.ts (o cualquier otro módulo)_

Y así poder empezar a integrarlos en nuestros componentes:

``` html
<mat-slider min="1" max="100" step="1" value="1"></mat-slider>

<button mat-button>Botón</button>

<mat-card>
  <mat-calendar></mat-calendar>
</mat-card>
```
_app.component.html_

---
<social-share class="social-share--footer" />
