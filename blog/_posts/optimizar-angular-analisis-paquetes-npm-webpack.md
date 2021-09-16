---
date: 2021-9-16
tags:
  - Angular
  - Nodejs
  - npm
  - webpack
permalink: /blog/:slug
---
 
# Optimizar Angular mediante el análisis de paquetes npm con webpack
 
<social-share class="social-share--header" />
 
Más allá de la optimización de una aplicación Angular a través por ejemplo de la [carga diferida de módulos](/blog/arquitectura-buenas-practicas-angular/#carga-diferida) o mediante el uso de una estrategia de detección de cambios basada en _OnPush_, también debemos tener en cuenta el hecho de que los paquetes de terceros que incluyamos, igualmente afectarán al tiempo de carga de la aplicación, bien por su propio tamaño o inclusive por su tiempo de inicialización. Es por ello que optimizar Angular mediante el análisis de paquetes npm, también debe ser uno de nuestros objetivos antes de poner la aplicación en producción.

A la velocidad a la que se mueve nuestro entorno de trabajo, seguro que se nos ocurren paquetes que hemos ido dejando de usar (en mi caso por ejemplo he sustituido _ng-zorro-antd_ por [_Tailwind CSS_con_Angular Material_](/blog/integrar-tailwind-css-angular-material/)) y que pueden en algunos casos haberse quedado como dependencia importada en el código sin que nos hayamos dado cuenta. También están los paquetes que cubrían necesidades que el lenguaje ya soporta (como usar _lodash_ en lugar de [métodos JavaScript de alto nivel como map,_filter,_reduce,_some, every o_forEach](/blog/optimizar-bucles-javascript/)), pero cuya dependencia no se llegó a eliminar durante las iteraciones de refactorización. Y no nos olvidemos de esas dependencias de paquetes de terceros que sirven para cubrir funcionalidades sencillas que bien podríamos implementar nosotros mismos sin apenas esfuerzo si supiéramos lo que dicho paquete incrementa el tamaño de nuestra aplicación.

## ¿Cómo analizar los paquetes de nuestra aplicación Angular?
 
[Webpack](/blog/usar-webpack-4-transformar-empaquetar-recursos-aplicacion-web/) dispone de una característica que consiste en la generación de un mapa visual de la composición de los paquetes webpack y dado que esta es la herramienta predeterminada para el empaquetado de módulos de Angular CLI, ¿porqué no aprovecharla?

### Instalación
En primer lugar lo que haremos será añadir el paquete necesario a nuestras dependencias de desarrollo:

``` bash
npm install --save-dev webpack-bundle-analyzer
```

### Configuración de scripts
A continuación modificaremos el fichero _package.json_ de nuestra aplicación para simplificar el proceso de generación del análisis de paquetes:

``` js
...,
  "scripts": {
    ...,
    "stats": "ng build --stats-json & webpack-bundle-analyzer dist/my-app/stats.json"
  },
...,
```
_package.json_

### Análisis de paquetes
A partir de este momento ya tenemos automatizado el análisis y visualización de nuestro mapa de paquetes mediante el siguiente comando:

``` bash
npm run-script stats
```

Y este será el resultado que veremos en nuestro navegador:

![Mapa interactivo de paquetes con webpack](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)
_Mapa interactivo de paquetes con webpack_

Con esta información ya podemos conocer qué hay dentro de los paquetes, qué módulos ocupan más espacio y qué módulos no deberían estar ahí, así que adelante con la optimización.

---
<social-share class="social-share--footer" />
