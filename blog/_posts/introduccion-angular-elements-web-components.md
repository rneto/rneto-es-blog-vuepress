---
date: 2021-05-29
tags:
  - Angular
  - AngularElements
  - WebComponents
permalink: /blog/:slug
---

# Introducción a Angular Elements y Web Components

<social-share class="social-share--header" />

[Angular Elements](https://angular.io/guide/elements) resuelve la problemática de la reutilización de código Angular en contextos donde no se hace uso de Angular y es la solución perfecta para incluir o actualizar funcionalidades incrustadas en el código heredado de nuestras aplicaciones. Esta técnica de inyección de SPA en nuestra aplicación nos permitiría ir eliminando bloques de código antiguo hasta que la nueva aplicación tome el lugar de la antigua por completo.

Angular Elements son componentes Angular convertidos en componentes web personalizados o más conocidos como Web Components.

## ¿Qué son los Web Components o Componentes Web?

Los Componentes Web son un conjunto de tecnologías que permiten crear elementos HTML reutilizables que encapsulan su propia estructura interna separándola del resto del código y que incluye a su vez sus propios elementos HTML, CSS y JavaScript.

Con ellos podemos crear componentes universales dentro de nuestro ecosistema de aplicaciones y reutilizarlos según nuestras necesidades.

Los componentes web están compuestos por un conjunto de APIs que permiten crear nuevas etiquetas HTML personalizadas y reutilizables en aplicaciones web y se basan en cuatro especificaciones principales:

- **_Custom elements_**: es la especificación usada para diseñar y definir los nuevos tipos de elementos DOM personalizados encapsulando contenido HTML, CSS y JavaScript.

- **Shadow DOM**: es la especificación JavaScript que define cómo se usan los estilos y el marcado de etiquetas de manera privada (ocultos en la sombra) del documento DOM principal.

- **_ES Modules_**: es la especificación que define la sintaxis de los módulos JavaScript, así como la reutilización de documentos JavaScript mediante la exportación de objectos, funciones o variables desde un archivo JavaScript.

- **_HTML templates_**: es la especificación que define cómo declarar fragmentos HTML que no se renderizan (no se cargan gráficamente) en la carga de la página, pero que se pueden reutilizar en tiempo de ejecución de manera explícita.

### Creación de un elemento personalizado

1. Crear una clase, una función JavaScript o usar un módulo JavaScript.
   - `class MyCalendar extends HTMLElement {...}`
1. Registrar nuestro nuevo elemento personalizado con el método [CustomElementRegistry.define()](https://developer.mozilla.org/es/docs/Web/API/CustomElementRegistry/define):
   - `window.customElements.define('my-calendar, MyCalendar);`
1. Usar la nueva etiqueta en nuestra página:
   - `<my-calendar></my-calendar>`
1. O en lugar de usar la etiqueta, podemos hacer uso del elemento personalizado dinámicamente como si de cualquier otra etiqueta se tratara:
   ``` js
     let myCalendar = document.createElement('my-calendar');
     myCalendar.addEventListener('load', () => {...});
     document.body.appendChild(myCalendar);
   ```

También es posible crear un componente extendiendo un elemento HTML definido, con lo que estaremos creando un elemento personalizado preconstruido:

- `class MyCalendar extends HTMLInputElement{...}`
- `window.customElements.define('my-calendar, MyCalendar, { extends: 'input' });`
- `<input type="text" is="my-calendar"></input>`

## ¿Qué es Angular Elements?

Angular Elements es básicamente un punto de unión entre los componentes Angular y el API de los **elementos personalizados** (custom elements).

> Con Angular Elements obtienes todo el poder de Angular para crear tus componentes web

Los [Angular Input](https://angular.io/api/core/Input) se asignan a las propiedades, los [Angular HostBinding](https://angular.io/api/core/HostBinding) se asignan a los atributos, los [Angular Output](https://angular.io/api/core/Output) se asignan a los eventos y los [Angular Lifecycle hooks](https://angular.io/guide/lifecycle-hooks) se asignan a los enlaces del ciclo de vida del elemento personalizado.

Dada la flexibilidad de los Componentes Web, podemos usar Angular Elements en infinidad de escenarios como complemento en prácticamente cualquier tipo de aplicación.

> Los componentes comparten el mismo árbol de injeción de dependencias, lo que nos permite compartir datos o funcionalidades entre componentes

### Creación de un elemento personalizado con Angular Elements

Para la creación de nuestro componente, en primer lugar crearemos nuestra nueva aplicación Angular:

``` bash
ng new my-calendar
```

A continuación usaremos Angular CLI para configurar automáticamente nuestro proyecto con el correcto polyfill:

``` bash
ng add @angular/elements --project=my-calendar
```

En nuestro proyecto podríamos crear el componente correspondiente al calendario, pero en este caso voy a aprovechar el componente de entrada de la aplicación _AppComponent_ para mi elemento:

``` html
<ng-content></ng-content> <input type="date" [(ngModel)]="date" /> <button (click)="saveDate()">Save</button>
```
_app.component.html_

Agregamos algunos estilos básicos:

``` css
input[type=date] {
  box-sizing: border-box;
  display: inline-block;
  margin: 8px 0;
  padding: 12px 20px;

  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  margin: 8px 0;
  padding: 14px 20px;

  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
```
_app.component.scss_

Completamos nuestro componente con una entrada y una salida.

``` ts
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() date:string | undefined;
  @Output() dateChanged = new EventEmitter();

  saveDate(){
    this.dateChanged.emit(this.date);
  }
}
```
_app.component.ts_

Configuramos nuestro módulo principal.

``` ts
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector:Injector) {}
  ngDoBootstrap() {
    customElements.define(
      'my-calendar',
      createCustomElement(AppComponent, {injector: this.injector})
    )
  }
 }
```
_app.module.ts_

Añadimos los paquetes necesarios para facilitar el proceso de generación de nuestros componentes en un único fichero:

``` bash
npm install --save-dev concat fs-extra
```

Creamos el fichero _elements-build.js_ en la raíz de nuestro proyecto con el contenido necesario:

``` js
const fs = require('fs-extra');
const concat = require('concat');
const package = require('./package.json');

(async function build() {
  const files = [
    './dist/my-calendar/vendor.js',
    './dist/my-calendar/runtime.js',
    './dist/my-calendar/polyfills.js',
    './dist/my-calendar/polyfills-es5.js',
    './dist/my-calendar/main.js'
  ];

  files = files.filter(function (value, index, arr) {
    return fs.pathExistsSync(value);
  });
  
  const dir = `./dist/elements/${package.version}`;

  await fs.ensureDir(dir);

  await concat(files, `${dir}/my-calendar.js`);

  await fs.copyFile(
    './dist/my-calendar/styles.css',
    `${dir}/my-calendar.css`
  );
})();
```
_elements-build.js_

Creamos el script de generación de nuestro elemento personalizado en nuestro fichero _package.json_:

``` json
{
  ...,
    "build:elements": "ng build --configuration=production --output-hashing none && node elements-build.js",
  ...
}
```
_package.json_

Ejecutemos nuestro comando de generación:

``` bash
npm run-script build:elements
```

Y ya podemos usar nuestro nuevo componente. En este caso he creado un fichero _index.html_ en la carpeta _dist_ de Angular para hacer mis pruebas:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My calendar</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel='stylesheet' href='elements/0.0.0/my-calendar.css'>

    <script>
      function initCalendar() {
        // How to: select my-calendar
        const myCalendar = document.querySelector('my-calendar');

        // How to: bind a event
        myCalendar.addEventListener('dateChanged', (event) => {
          console.log(event);
        });

        // How to: set values to my-calendar
        myCalendar.setAttribute('date', '2033-03-03');
        myCalendar.date = '2044-04-04';

        // How to: create a new my-calendar
        const MyCalendarElement = customElements.get('my-calendar');
        const myCalendar2 = new MyCalendarElement();
        myCalendar2.date = '2031-01-01';

        // How to: append a child element to the new my-calendar
        const myCalendar2Span = document.createElement("span");
        myCalendar2Span.innerText = 'My custom calendar 2 content';
        myCalendar2.appendChild(myCalendar2Span);

        // How to: append the new my-calendar to the document
        document.body.appendChild(myCalendar2);
      }
    </script>
  </head>
  <body>
    <my-calendar date="2022-02-02">
      <span>My custom calendar content</span>
    </my-calendar>

    <script
      src="elements/0.0.0/my-calendar.js"
      defer onload="initCalendar();"
    ></script>
  </body>
</html>
```
_index.html_

---
<social-share class="social-share--footer" />
