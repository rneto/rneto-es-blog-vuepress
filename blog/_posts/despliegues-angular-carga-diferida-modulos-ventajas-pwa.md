---
date: 2022-04-28
tags:
  - Angular
  - PWA
permalink: /blog/:slug
---

# Sobre los despliegues con Angular, la carga diferida de módulos y las ventajas de una PWA

<social-share class="social-share--header" />

Cuando generamos una aplicación Angular para su despliegue con la configuración de producción predeterminada, automáticamente nos encontramos con una serie de ficheros de fragmentos de código (_chuncks_) nombrados específicamente para dicha generación y empaquetado y donde webpack se encarga de todo el trabajo de manera transparente para nosotros. Un posible ejemplo de los ficheros que nos encontraríamos en la carpeta _dist_ serían:

```
dist/
|- 339.5bafa95f5069e770796c.js
|- 592.7d0bbcb1e2716fd8c89c.js
|- index.html
|- main.aacafeb9a86f33b33dbb.js
|- polyfills.90cb5c4ede3ffbbf8eac.js
|- runtime.90b29387259b20a3df3f.js
|- styles.182e3c991344b37810ea.css
```

Podemos observar que en el nombre de los ficheros _css_ y _js_ existe una cadena de caracteres alfanuméricos aleatorios, que en realidad es un código hash que se calcula en base al contenido de cada fichero. Es por ello que cuando realizamos cambios en nuestro código y volvemos a hacer una nueva generación y empaquetado de la aplicación, el código hash de cada fichero puede variar:

```
dist/
|- 339.681c5565b08b6b94c92c.js
|- 592.6ad7450cd17f530a77ba.js
|- index.html
|- main.dcc0fdb08ffa222d9e74.js
|- polyfills.90cb5c4ede3ffbbf8eac.js
|- runtime.20caa6a1d9eb3da29ff6.js
|- styles.55ff9c680cf12d9405cc.css
```

Uno de los criterios que determina el número de ficheros en los que se empaquetará nuestra aplicación tiene relación con una de las [buenas prácticas de Angular](/blog/arquitectura-buenas-practicas-angular/) usada muy habitualmente para optimizar su rendimiento y que consiste en el uso de la [carga diferida](/blog/arquitectura-buenas-practicas-angular/#carga-diferida) de los [módulos de funcionalidades](/blog/arquitectura-buenas-practicas-angular/#feature-modules). Dicha práctica permite que una vez generada y empaquetada nuestra aplicación, nuestro código se fragmente en más ficheros, los cuales se descargarán dinámicamente del servidor según la aplicación vaya haciendo uso de cada módulo en cuestión.

Dado este comportamiento del sistema de generación de Angular, podríamos preguntarnos:

## ¿Qué ocurre cuando desplegamos una nueva versión de una aplicación Angular y el navegador del cliente ha cacheado la versión anterior?

El fichero _index.html_ tiene las referencias a los ficheros principales de la aplicación (según mi ejemplo, _main.*.js_, _polyfills.*.js_, _runtime.*.js_ y _styles.*.css_), los cuales a su vez, cargan dinámicamente el resto de ficheros cuando sea necesario (según mi ejemplo _339.*.js_ y _592.*.js_). Esto implica que si no hemos seguido una estrategia adecuada en cuanto a la configuración del servidor donde hemos publicado nuestra aplicación, es muy probable que en algún momento la aplicación le falle al cliente, bien porque está accediendo a recursos cacheados que ya no son válidos (puede que estemos realizando operaciones que ya no están disponibles) o porque intenta acceder a recursos o ficheros de fragmentos de código que ya no existen (este sería el error típico de _ChunkLoadError: Loading chunk 339 failed._, donde el 339 hace referencia a uno de los ficheros de fragmento de código de mi ejemplo).

Así pues, una sencilla medida a tomar para evitar este problema, consiste en deshabilitar la caché del fichero _index.html_ de nuestra aplicación agregándole el encabezado HTTP **_Cache-Control_** con el valor **_no-store, max-age=0_**.

> ¿Por qué _no-store_ en lugar de _no-cache_? Con _no-store_, el recurso no se almacena en ningún lugar. Con _no-cache_, el recurso puede almacenarse, pero el almacén debe validarse con el servidor antes de usarlo.

> ¿Por qué _max-age=0_? Fuerza a que se borren las respuestas de caché válidas preexistentes (_no-store_ no lo hace).

> Si estás usando Internet Information Services, te recomiendo que le eches un vistazo a mi artículo sobre [Desplegar una aplicación Angular en Internet Information Services](/blog/desplegar-angular-internet-information-services/) donde encontrarás cómo adaptar tu fichero _web.config_ para añadir la cabecera personalizada _Cache-Control_ al fichero _index.html_.

Con esta técnica, tendríamos una solución sencilla sobre cómo evitar problemas con la caché del navegador del cliente cuando despleguemos nuevas versiones de nuestra aplicación Angular, sin embargo, ¿cómo evitamos estos errores si durante el despliegue de una nueva versión los usuarios están navegando por la aplicación?

## Ventajas de convertir una aplicación Angular en PWA (Progressive Web App, Aplicación Web Progresiva)

> ¿Qué es una PWA? Básicamente es una aplicación web a la que hemos dotado de nuevas capacidades para hacerla más potente mediante las API de los navegadores modernos, incrementado su rendimiento y fiabilidad mediante una mejor experiencia de usuario independientemente de la calidad de la red y por último, transformado la interacción de los usuarios haciéndola instalable.

Una de las ventajas de convertir una aplicación Angular en PWA consiste en que convertimos nuestra aplicación web en descargable e instalable, del mismo modo que se haría con una aplicación nativa, con el añadido de que la misma aplicación será compatible con cualquier sistema operativo que incluya alguno de los navegadores modernos.

El proceso de descarga e instalación ocurre en segundo plano, sin por ello alterar la experiencia del usuario y donde además el sistema de actualización se basa en un versionado incremental, es decir, con un simple cambio en alguno de nuestros ficheros, se producirá la reinstalación exclusiva de los recursos que se vean afectados, en lugar de instalarse toda la aplicación nuevamente.

Además, el usuario siempre tendrá activa una versión completa operativa e inclusive podría llegar a tener diferentes pestañas del navegador con diferentes versiones, con la ventaja de que le podríamos preguntar en cada caso si desea una actualización de la versión de cada instancia de la aplicación.

También obtenemos ventajas en cuanto al tiempo de respuesta en la descarga de los recursos de la aplicación ya que el Service Worker funciona como una capa intermedia de caché en el navegador, aligerándose por lo tanto los tiempos de carga de los recursos requeridos por la navegación del usuario.

## Convertir una aplicación Angular en PWA

Para convertir una aplicación existente en PWA basta con ejecutar el siguiente comando en la carpeta de nuestra aplicación:

``` bash
ng add @angular/pwa --project *project-name*
```
_*project-name* se refiere al nombre de nuestro proyecto, tal cual figura en el fichero angular.json._

Con esta simple acción, se habrán llevado a cabo las siguientes operaciones:

- Agregado del ```@angular/service-worker``` al proyecto.
- Habilitado de la compatibilidad con la compilación del Service Worker en Angular CLI.
- Importación y registro del Service Worker en el módulo _AppModule_.
- Actualización del fichero _index.html_ para incluir un enlace al nuevo fichero _manifest.webmanifest_ y para agrega una etiqueta _meta_ para el color del tema.
- Añadido de los iconos predeterminados (que podremos sustituir) para la instalación de la PWA.
- Creación del fichero de configuración del Service Worker _ngsw-config.json_, donde se especifica el comportamiento de la caché y otros parámetros.

Dado que _ng serve_ no ofrece soporte para probar nuestro nuevo Service Worker, podemos hacer uso del paquete _[http-server](/blog/servir-archivos-html-estaticos-localmente-nodejs-http-server/)_ para nuestras pruebas.

En primer lugar lo instalamos globalmente:

``` bash
npm install -g http-server
```

Y a continuación servimos nuestra aplicación, la cual hemos generado previamente con _ng build_:

``` bash
http-server -p 8080 -c-1 dist
```

Para conocer más sobre Service Workers y Angular PWA, te recomiendo que le eches un vistazo a [Angular service worker introduction](https://angular.io/guide/service-worker-intro) y los recursos relacionados.

## Notificar al usuario de la existencia de una nueva versión de la aplicación

Una vez hayamos convertido nuestra aplicación a PWA, ya tenemos la capacidad de poder notificar al usuario cuando exista una nueva versión de la aplicación y por lo tanto, asegurarnos de que use la versión correcta. Para ello crearemos un servicio que comprobará la versión de la aplicación en tres escenarios distintos:

1. Durante la inicialización de la aplicación, tras una navegación desde fuera de nuestra aplicación o cuando se haga una actualización manual.
2. Tras una comprobación programada que hemos configurado para realizarse por ejemplo cada 10 minutos.
3. Cuando se produzcan inconsistencias en la caché de la aplicación que impidan cargarla correctamente.

``` ts
import { SwUpdate } from '@angular/service-worker';
import { ApplicationRef, Injectable } from '@angular/core';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VersionUpdateService {
  constructor(app: ApplicationRef, updates: SwUpdate) {
    if (updates.isEnabled) {
      // 1. Inicialización
      updates.available.subscribe((event) => {
        if (confirm('Hay una nueva versión de la aplicación. ¿Deseas instalarla ahora?')) {
          updates.activateUpdate().then(() => window.location.reload());
        }
      });

      // 2. Comprobación
      const appIsStable$ = app.isStable.pipe(
        first((isStable) => isStable === true)
      );
      const checkInterval$ = interval(10 * 60 * 1000);
      const everyIntervalOnceAppIsStable$ = concat(
        appIsStable$,
        checkInterval$
      );
      everyIntervalOnceAppIsStable$.subscribe(() => updates.checkForUpdate());

      // 3. Inconsistencias
      updates.unrecoverable.subscribe((event) => {
        alert('Se ha producido un error y no podemos cargar la aplicación. Por favor, recarga la página para solucionarlo.');
      });
    }
  }
}
```

Y para terminar, ya sólo tendríamos que agregar el servicio al constructor de nuestro componente de entrada _app.component.ts_ para que se ponga en marcha el servicio de comprobación de versiones de la aplicación.

``` ts
// ...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public constructor(private versionUpdateService: VersionUpdateService) {}
  // ...
}
```

---
<social-share class="social-share--header" />
