---
date: 2020-5-14
tags: 
  - nodejs
  - npm
  - webpack
permalink: /:slug
---

# Usar Webpack 4 para transformar y empaquetar recursos de una aplicación web

<social-share class="social-share--header" />

[Webpack](https://webpack.js.org/) es una de las tecnologías JavaScript más usadas desde hace años para transformar y empaquetar todo tipo de recursos de la web, tales como JavaScript, HTML, CSS o imágenes.

Su sistema se basa en la ejecución encadenada de [loaders](https://webpack.js.org/concepts/loaders/) y [plugins](https://webpack.js.org/concepts/plugins/) que transforman y empaquetan nuestros archivos y sus dependencias, dando como resultado nuevos recursos estáticos (conocidos como _bundles_) que usaremos en nuestra aplicación.

Con Webpack podemos por ejemplo convertir ES2015+ a ES5, TypeScript, CoffeeScript, Elm a JavaScript, importar imágenes, estilos CSS, JSON o XML directamente en nuestro fichero JavaScript, transformar nuestras plantillas Markdown, Pug, Jade, Twig a HTML, convertir ficheros SCSS, SASS, Stylus, LESS, PostCSS a CSS y mucho más.

Partiendo por ejemplo de los archivos JavaScript:

``` javascript
// index.js
const user = require('./user');
console.log(`Hi ${user.getName()}!`);
```

``` javascript
// user.js
const getName = () => {
  return 'Rafael';
};

exports.getName = getName;
```

Webpack tomaría como archivo de entrada nuestro _index.js_, analizaría sus dependencias (_user.js_) y generaría un nuevo recurso único _main.js_ con todo el código necesario.




## Instalación de Webpack de manera global

Para poder instalar Webpack es necesario tener previamente instalado [Node.js](https://nodejs.org/es/).

Instalarlo de manera global nos permite acceder a él desde cualquier punto del terminal.

``` bash
npm install webpack webpack-cli -g
```

De esta manera habremos instalado el paquete, así como los comandos necesarios para poder realizar las operaciones propias con Webpack.

## Instalación de Webpack de manera local

Si no lo hemos hecho aún, debemos iniciar npm en la carpeta de nuestro proyecto pada poder ir grabando las dependencias que se vayan instalando.

``` bash
npm init
```

Indicaremos lo que sea necesario en las preguntas que nos hará el sistema o pulsaremos _intro_ para dejar los valores predeteminados en el nuevo fichero _package.json_ que se creará.

A continuación ya podemos instalar Webpack como paquete de dependencia para desarrollo (usando la opción _--save-dev_ o _-D_), dado que es un paquete que sólo usaremos durante la creación (_build_) de nuestra aplicación.

``` bash
npm i --save-dev webpack webpack-cli
```

## Configurando y empaquetado con Webpack

Es posible usar Webpack desde la línea de comandos con todas las opciones que necesitamos para poder transformar y empaquetar nuestros recursos, pero en la práctica, lo más recomendable es generar un fichero de configuración _webpack.config.js_ en el directorio raíz de nuestro proyecto.

Para nuestro ejemplo anterior de dos archivos JavaScript _index.js_ y _user.js_, bastaría con generar el siguiente contenido en el fichero de configuración.

``` javascript
// webpack.config.js
module.exports = {
  entry: './index.js'
};
```
Aprovecharíamos además para añadir un nuevo script al fichero _package.json_ y así simplificar la ejecución de Webpack.

``` bash
{
  ...
  "scripts": {
    ...,
    "build": "webpack"
  },
  ...
}
```

Ahora, cuando ejecutemos el comando ```npm run build``` en nuestro directorio, se realizará el empaquetado de nuestros archivos de manera predeterminara en _./build/main.js_.

Puedes consultar todo el código del anterior ejemplo en [GitHub](https://github.com/rneto/webpack-4-basic-js-build-test).


---
<social-share class="social-share--footer" />