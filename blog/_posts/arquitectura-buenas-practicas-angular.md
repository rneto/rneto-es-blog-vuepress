---
date: 2020-12-19
tags:
  - Angular
permalink: /blog/:slug
---

# Arquitectura y buenas prácticas para una aplicación basada en Angular

<social-share class="social-share--header" />
<last-updated />

En este artículo encontrarás el planteamiento de una posible evolución de los conceptos de arquitectura de una aplicación Angular que podemos extraer de la [guía de estilo de referencia oficial de Angular](https://angular.io/guide/styleguide). Para ello he definido una serie de pautas y buenas prácticas a la hora de planificar y estructurar nuestra aplicación con el objectivo de hacerla escalable.

> La escalabilidad en una aplicación Angular implica soportar el aumento del tamaño de los datos cargados en la misma, lo que aumenta la complejidad y el tamaño del proyecto y generalmente es seguido de tiempos de carga más largos.

## Estructura de la aplicación

Seguiremos una estructura de proyecto orientada a módulos. Con dicho enfoque, oficialmente recomendado, los módulos son claramente visibles en el árbol de carpetas como directorios separados y cada módulo contiene todos los archivos que están relacionados con el módulo en cuestión.

```
app/
|- core/
   |- core.module.ts
   |- services/
      |- auth.service.ts
   |- core-routing.module.ts
   |- core.module.ts
   |- index.ts
|- feature1/
   |- components/
      |- component1/
         |- ...
         |- component1.component.ts
      |- component2/
         |- ...
      |- shared/
         |- ...
   |- models/
      |- ...
   |- services/
      |- ...
   |- feature1-routing.module.ts
   |- feature1.module.ts
   |- index.ts
|- feature2/
   |- ...
|- feature3/
   |- ...
|- shared/
   |- components/
      |- component1/
         |- ...
         |- component1.component.ts
      |- component2/
         |- ...
   |- models/
   |- pipes/
      |- pipe1.pipe.ts
   |- index.ts
   |- shared.module.ts
|- app-component.ts
|- app.module.ts
```

Como podemos apreciar, existen tres módulos principales en el proyecto:

- _AppModule_: es el módulo principal de la aplicación, responsable de su arranque y de la combinación de otros módulos.
- _CoreModule_: incluye las funcionalidades básicas de la aplicación, en su mayoría servicios globales, que se utilizarán en toda la aplicación a nivel global. No debe ser importado por los módulos de funcionalidades de la aplicación.
- _SharedModule_: es normalmente un conjunto de componentes o servicios que se reutilizarán en otros módulos de la aplicación, pero que no son aplicados globalmente en la aplicación. Puede ser importado por los módulos de funcionalidades.

El tercero de estos módulos se engloba en los denominados [módulos de funcionalidades de la aplicación](https://angular.io/guide/feature-modules). Dichos módulos estarán aislados entre si y se ubicarán en directorios específicos bajo el directorio raíz de la aplicación.

Los módulos de funcionalidades se clasifican en [seis tipos](https://angular.io/guide/module-types) con el objetivo de separar las responsabilidades en:
- _Dominio_: ofrece una experiencia de usuario dedicada a un dominio de aplicación en particular, como editar un cliente o realizar un pedido
- _Enrutador_: es el módulo de dominio que actúa como componente principal de la funcionalidad y cuyo objetivo es el de encaminar la navegación del usuario por la funcionalidad. Por definición, todos los módulos cargados de forma diferida ([lazy loading](#carga-diferida)) son módulos de funcionalidades enrutados.
- _Enrutamiento_: proporciona la configuración de enrutamiento para otro módulo y separa las preocupaciones de enrutamiento de su módulo complementario.
- _Servicio_: proporciona servicios de utilidad tales como acceso a datos y mensajería.
- _Complemento_: hace que los componentes, directivas y demás artilugios estén disponibles para los módulos externos. Muchas bibliotecas de componentes de _UI_ de terceros son módulos de complementos (_widgets_).
- _Compartido_: permite reutilizar piezas de la aplicación como directivas, transformadores (_pipes_) y componentes. Es al módulo que conmunmente llamamos _SharedModule_.

Esta estructura permite la separación de responsabilidades de una manera clara, además de ser el punto de partida para la implementación de la carga diferida de los contenidos de la aplicación, paso fundamental para la preparación de una arquitectura escalable.

### AppModule

- Este módulo ocupa la raíz de la carpeta de la aplicación y deberá contener exclusivamente lo más elemental.
- Su función es simplemente arrancar la aplicación Angular y proporcionar la salida de la ruta raíz (_router-outlet_). **Este enfoque también deja abierta la posibilidad de ejecutar múltiples aplicaciones Angular independientes a través de la misma URL base.**
- Importará los módulos _CoreModule_ y _SharedModule_.

### CoreModule

- Su objetivo es recopilar todos los servicios que tienen que tener una única instancia en la aplicación (servicios _singleton_) en un sólo módulo. Es el caso por ejemplo del servicio de autenticación o el servicio de usuario.
- El _CoreModule_ será importado únicamente en el módulo _AppModule_ con el objetivo de reducir la complejidad de dicho módulo y enfatizar su papel como simple orquestador de la aplicación.

> ¿Cómo asegurarnos de que _CoreModule_ sólo sea importado desde el _AppModule_? Controlándolo a través de su constructor.

``` js
  constructor (@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
```
_core.module.ts_

- Desde Angular 6, la forma preferida de crear un servicio _singleton_ es indicando en el propio servicio, que debe ser proporcionado en la raíz de la aplicación. Para ello, se debe configurar la propiedad _providedIn_ como _root_ en el decorador _@Injectable_ del servicio. De este modo, no es necesario indicar explícitamente en la propiedad _providers_ del decorador _NgModule_ de _CoreModule_ nuestros servicios _singleton_.

``` js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
}
```
_auth.service.ts_

> **CONSEJO ·** Podemos potenciar la reutilización de los servicios y funcionalidades de _CoreModule_ en otras aplicaciones creando un nuevo directorio _core_ en la raíz de la aplicación y moviendo cada funcionalidad de _CoreModule_ a un nuevo módulo.

### SharedModule

- Todos los componentes, servicios y _pipelines_ compartidos deben ser implementados en este módulo.
- No importará ni inyectará servicios u otras características del _CoreModule_ u otras características en sus constructores.
- Sí podrá definir servicios que no deban ser persistentes.
- Sus componentes deberán recibir todos los datos a través de atributos en el modelo del componente que los utiliza. Todo esto se resume en el hecho de que _SharedModule_ no tiene ninguna dependencia del resto de nuestra aplicación.
- Es el módulo en el por ejemplo deberemos importar y reexportar los componentes de Angular Material y los módulos _CommonModule_, _FormsModule_ y _FlexLayoutModule_.

> **CONSEJO ·** Podemos potenciar la reutilización de componentes de interfaz de _SharedModule_ en otras aplicaciones creando un nuevo directorio _ui_ en el raíz de la aplicación y moviendo cada grupo de componentes de _SharedModule_ a un nuevo módulo.

### Feature modules

- Crearemos múltiples módulos de funcionalidades para cada característica independiente de nuestra aplicación.
- Los módulos de funcionalidades sólo deben importar servicios de _CoreModule_ o _SharedModule_, así pues, si el módulo de funcionalidades _feature1_ necesita importar un servicio del módulo _feature2_, será necesario trasladar ese servicio al _CoreModule_.
- Podrán contener sus propios artefactos (servicios, interfaces o modelos entre otros) siempre y cuando sean exclusivos para el propio módulo.
- Permitirá asegurarnos de que los cambios en una característica no pueden afectar o interrumpir el resto de nuestra aplicación.

## Enrutamiento

El enrutador de Angular (_[Router](https://angular.io/guide/router)_) permite la navegación de una vista a la siguiente. En nuestro caso, no vamos a añadir rutas al componente raíz (_AppComponent_), sino que cuando la aplicación arranque, el _CoreRoutingModule_ (declarado en _app/core/core-routing.module.ts_) se activará y cargará los componentes necesarios.

> _CoreModule_ maneja el enrutamiento raíz de la aplicación, por lo tanto en teoría, deberíamos ser capaces de importar un nuevo _Core2Module_ en _AppModule_ que podría representar una nueva versión de la aplicación y la implementación de esta aplicación no tendría ningún impacto en la aplicación que se ejecuta a través de _CoreModule_.

En _CoreRotingModule_ se configurarán las rutas de entrada a los módulos de funcionalidades, dentro de los cuales se utilizarán las rutas declaradas en el propio módulo para navegar y mostrar el contenido dentro de la URL del propio módulo.

> Los módulos de funcionalidades son módulos con enrutamiento propio y se crean para separar y organizar las diferentes áreas de la aplicación. Es por ello que se cargan solo una vez, ya sea desde el enrutamiento raíz o mediante la carga diferida.

Cuando el usuario navegue a un área protegida de la aplicación, el _AuthGuardService_ del _CoreModule_ comprobará las condiciones de _canActivate_ y sólo cargará el módulo de manera diferida si el usuario está autenticado.

``` js
const routes: Routes = [
  {
    path: 'feature1',
    loadChildren: () => import('./feature1/feature1.module').then(m => m.Feature1Module),
    canActivate: [AuthGuardService]
  },
  {
    path: 'feature2',
    loadChildren: () => import('./feature2/feature2.module').then(m => m.Feature2Module),
    pathMatch: 'full'
  },
 ...
```
_core-routing.module.ts_

### Carga diferida

Para evitar posibles problemas de rendimiento en la carga de la aplicación, se hará uso del patrón _carga diferida_ (_[Lazy-Loading](https://angular.io/guide/lazy-loading-ngmodules)_), capacidad incorporada en Angular y que permite aplazar la carga de una parte particular de la aplicación hasta que sea realmente necesaria.

Basta con definir correctamente las rutas de los módulos, para que apunte a un archivo de módulo que será cargado sólo cuando sea realmente necesario.

``` js
const routes: Routes = [
  {
    ...
    loadChildren: () => import('./feature1/feature1.module').then(m => m.Feature1Module),
    ...
  },
 ...
```
_core-routing.module.ts_

Gracias a la estructura de módulos definida, nuestros módulos de funcionalidades podrán cargarse de forma diferida una vez que se haya inicializado la aplicación, lo que reducirá enormemente el tiempo de arranque de la aplicación. Además de ello, cuando la aplicación crezca y se añadan más módulos, el paquete de núcleo de la aplicación y por lo tanto su tiempo de inicio seguirán siendo los mismos.

## Flujo de datos

En Angular, el flujo de datos preferido es unidirecional donde los datos fluyen de _arriba hacia abajo_, mucho más fácil de mantener y seguir que el enlace bidireccional. Los datos pasan del componente padre principal al componente hijo secundario y del componente hijo a la plantilla.

> La separación de responsabilidades de los componentes en niveles facilita su reutilización, mantenimiento y validación (pruebas unitarias).

Cuando sea necesario estructurar los componentes por niveles, debemos seguir las siguientes directrices.

- **_Componentes de nivel N_**
  - Definen las partes de la aplicación que contienen parte de lógica, la comunicación con los servicios y causan efectos secundarios (como llamadas a servicios o actualizaciones de estado). Es el que inyecta el servicio y lo usa para obtener los datos.
  - Son los contenedores de los componentes a los que se transferirán los datos a través de sus atributos.
  - Son los componentes de entrada de las rutas del propio módulo por lo que cada componente estará asociado a una ruta del módulo.
  - Se deberá procurar que el número de componentes de este tipo sea el menor posible.
- **_Componentes de nivel N+1_**
  - Son componentes con muy poca o ninguna lógica.
  - Todos los datos de entrada que necesitan se pasan a través de sus parámetros _@Input_.
  - Si el componente desea comunicarse hacia fuera, debe emitir un evento a través del atributo _@Output_.
  - Cuantos más componentes tengamos de este tipo más sencillo será el flujo de datos y más fácil será trabajar con él.
  - La estrategia de detección de cambios para estos componentes puede ajustarse a [_onPush_](https://blog.mgechev.com/2017/11/11/faster-angular-applications-onpush-change-detection-immutable-part-1/), que activará el proceso de detección de cambios para el componente sólo cuando se hayan modificado las propiedades de entrada. Es un método fácil de implementar y muy eficiente para optimizar aplicaciones Angular.

> Si conseguimos encontrar el equilibrio entre un número adecuado de componentes y el principio de responsabilidad única, más sencillo será el flujo de datos y más fácil será trabajar con él.

## Administración de estado

Un estado dado es usualmente compartido y su información afecta a múltiples componentes e incluso pantallas a la vez. Es por ello que las operaciones sobre el estado suelen ser complejas en una aplicación Angular, donde además se pueden llegar a realizar con frecuencia.

Una de las maneras de abordar estos problemas es aprovechar el flujo de datos unidireccional a nivel de toda la aplicación. La comunidad Angular ha adoptado ampliamente el patrón de arquitectura _[Redux](https://github.com/angular-redux/platform)_, creado originalmente para aplicaciones _React_.

La idea detrás de _Redux_ es que todo el estado de la aplicación se almacena en un único _[store](https://github.com/angular-redux/platform/tree/master/packages/store)_, el objeto que representa el estado actual de la aplicación. Un _store_ es inmutable, no puede ser modificado, cada vez que un estado necesita ser cambiado, un nuevo objeto tiene que ser creado.

Un único punto de referencia para todo el estado de la aplicación simplifica el problema de la sincronización entre las diferentes partes de la aplicación. No tienes que buscar una información determinada en diferentes módulos o componentes, todo está disponible en el _store_.

> Si quieres disponer de una solución de almacenamiento centralizada, sencilla y poco costosa, también te recomiendo que le eches un vistazo a este otro artículo que he creado sobre [Gestionar el estado de una aplicación Angular usando RxJs BehaviorSubject para servicios de datos observables](/blog/gestionar-estado-angular-rxjs-behaviorsubject-servicios-datos-observables/).

## Aliases para la aplicación y entorno

Usar un alias para las carpetas y entornos de nuestra aplicación nos permitirá realizar importaciones de una manera más limpia y consistente a lo largo de la evolución de nuestra aplicación.

El uso de un alias nos permitiría simplificar el modo de realizar nuestras importaciones:
``` js
import { AuthService } from '../../../.../core/services/auth.service';

[vs]

import { AuthService } from '@app/core';
```

Para ello, debemos configurar en primer lugar las propiedades _baseUrl_ y _paths_ en nuestro archivo _tsconfig.json_ de la siguiente manera (verás que estamos creado un alias para toda la aplicación y otro para los _environments_):

``` js
{
  ...
  "compilerOptions": {
    ...
    "baseUrl": "src",
    "paths": {
      "@app/*": ["app/*"],
      "@env/*": ["environments/*"]
    }
  }
}
```
_tsconfig.json_

A continuación, debemos agregar un archivo _index.ts_ por cada paquete (se llamará como la carpeta física que lo contiene) que queramos importar y dentro del cual realizaremos la exportación de todas las entidades públicas que queramos incluir en dicho paquete.

``` js
export * from './core.module';
export * from './services/auth-guard.service';
export * from './services/auth.service';
```
_app/core/index.ts_

Este fichero se podría simplificar más aún si extrapolamos la creación de ficheros _index.ts_ en el resto de carpetas de nuestros artefactos.

``` js
export * from './auth-guard.service';
export * from './auth.service';
```
_app/core/services/index.ts_

``` js
export * from './core.module';
export * from './services';
```
_app/core/index.ts_

> En caso de que usando VSCode, este no reconozca nuestros alias al usarlos en los _import_, deberemos reiniciar nuestro servidor TypeScript. Para ello en VSCode pulsamos _Cmd/Ctrl + Shift + P_, escribimos _Typescript: Restart TS Server_ y pulsamos _Enter_.

## Sass

Soy partidario de establecer _[Sass](https://sass-lang.com/)_ como preprocesador de estilos CSS a utilizar. Además de las ventajas propias de Sass, éste nos permite integrar de una manera más efectiva la biblioteca oficial de componentes de Angular Material así como sus amplias capacidades de personalización.

Para ello, debemos indicarlo en la creación del proyecto:

```
ng new scss-project --style=scss
```

O establecerlo en los estilos predeterminados de un proyecto existente:

```
ng config schematics.@schematics/angular:component.styleext scss
```

_@schematics/angular es el esquema predeterminado para Angular CLI_
_Será necesario además renombrar la extensión de todas las hojas de estilo de css a scss._

## Compilación manual para producción

Dadas las limitaciones de compilación para producción ofrecidas de manera predeterminada por _Angular CLI_ en el archivo _package.json_, debemos hacer una pequeña personalización en dicho archivo para poder disponer de la posibilidad de compilar la aplicación con opciones específicas para su integración en producción.

``` js
{
  ...
  "scripts": {
    ...
    "build:prod": "ng build --prod --build-optimizer",
    ...
  }
  ...
}
```
_package.json_

_[ng build](https://angular.io/cli/build)_

## Commits y changelog

Para tener una rápida visión general de cuáles son las nuevas características y correcciones de errores del proyecto, debemos hacer uso del archivo _CHANGELOG.md_.

Como agregar los cambios manualmente a dicho archivo sería una tarea tediosa, lo mejor es automatizar dicho proceso. En nuestro caso vamos a optar por la herramienta [**standard-version**](https://github.com/conventional-changelog/standard-version).

Esta herramienta genera y actualiza automáticamente el archivo _CHANGELOG.md_ en base a la especificación [Conventional Commits](https://conventionalcommits.org/) (basado a su vez en la [convención de Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit)), que indica cómo estandarizar los commits de todas las modificaciones de nuestra aplicación y que determina correctamente la nueva versión de nuestro proyecto.

_Conventional Commits_ define el `tipo` (obligatorio), el `ámbito` (opcional), seguido por el `mensaje de confirmación`. También es posible añadir `cuerpo` y `pie de página` (opcionales), ambos separados por una línea en blanco.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
_format_

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```
_example_

```
refactor!: drop support for Node 6
```
_example_

```
docs: correct spelling of CHANGELOG
```
_example_

```
feat(lang): add Spanish language
```
_example_

```
fix: correct minor typos in code

see the issue for details

on typos fixed.

Reviewed-by: Z
Refs #133
```
_example_

**Resumen de tipos**
- _build_: Cambio que afecta a la compilación del sistema o a dependencias externas
- _ci_: Cambios en la configuración CI
- _docs_: Cambios sólo en la documentación
- _feat_: Una nueva funcionalidad
- _fix_: La solución de un error
- _perf_: Un cambio de código que mejora el rendimiento
- _refactor_: Un cambio de código que no corrige un error ni añade una característica
- _style_: Cambios que no afectan el significado del código (espacios en blanco, formato, un punto y coma que falta, etc)
- _test_: Añadir pruebas que faltan o corregir pruebas existentes

## Angular Material

[Angular Material](https://material.angular.io/) es una librería de componentes web basada en Material Design y creada por el propio equipo de Angular. Aquí te explico [¿Por qué usar Angular y Material Design?](/blog/por-que-usar-angular-material-design/)

### Sidenav

El componente _sidenav_ se usa para añadir contenido a los laterales de una aplicación a pantalla completa.

La estructura básica de uso del componente es la siguiente:

``` html
<mat-sidenav-container>
  <mat-sidenav>Sidenav content</mat-sidenav>
  <mat-sidenav-content>Main content</mat-sidenav-content>
</mat-sidenav-container>
```

#### Detección del evento _scroll_

En el caso de que queramos detectar el evento _scroll_ sobre el contenido de _mat-sidenav-content_, no debemos agregar dicho nodo a la plantilla ya que éste se generará automáticamente con la directiva _cdkScrollable_ ya añadida a él. Si haces uso de _mat-sidenav-content_ en tu plantilla, el objeto _scrollable_ será _undefined_.

Es necesario además que se use el evento _AfterViewInit_ en lugar de _OnInit_ para evitar que el objeto _scrollable_ sea _undefined_.

``` js
import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSidenavContainer } from '@angular/material';

export class SidenavComponent implements AfterViewInit {

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  scrolledContent: boolean = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.sidenavContainer.scrollable.elementScrolled().subscribe(() =>
      {
        this.onSidenavContainerScroll();
      });
  }

  private onSidenavContainerScroll() {
    const scrollTop = this.sidenavContainer.scrollable.getElementRef().nativeElement.scrollTop || 0;
    if (scrollTop > 10 && this.scrolledContent === false) {
      this.ngZone.run( () => { this.scrolledContent = true; });
    } else if (scrollTop <= 10 && this.scrolledContent === true) {
      this.ngZone.run( () => { this.scrolledContent = false; });
    }
  }

}
```
_sidevav.component.ts_

> _[NgZone](https://angular.io/api/core/NgZone)_ nos permite ejecuta nuestro trabajo en la zona de Angular.
En el ejemplo de _sidevav.component.ts_ lo usamos para que un componente hijo sea notificado de que la variable _scrolledContent_ ha cambiado.

---
<social-share class="social-share--footer" />
