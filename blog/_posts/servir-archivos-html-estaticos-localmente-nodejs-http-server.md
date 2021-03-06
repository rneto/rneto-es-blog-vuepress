---
date: 2020-5-10
tags:
  - nodejs
  - npm
  - httpserver
permalink: /blog/:slug
---

# Servir archivos HTML estáticos localmente con Node.js y http-server

<social-share class="social-share--header" />

A menudo necesitamos servir localmente ficheros HTML estáticos, sin tener que instalar y configurar un servidor HTTP para un contenido tan simple.

Algunas alternativas rápidas podrían ser abrir directamente el fichero HTML en nuestro navegador web favorito, hacer uso de la extensión [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) de Google Chrome o usar la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de Visual Studio Code, sin embargo, si queremos dar pasos hacia [Node.js](https://nodejs.org/en/) y aprovechar su potencial, una de las formas más sencillas de servir localmente el contenido de un directorio es usando el paquete **[http-server](https://www.npmjs.com/package/http-server)** que nos ofrece un **servidor HTTP sencillo, potente y con cero esfuerzo en cuanto a configuración inicial**.

Lo primero que debes hacer es instalar el paquete. Puedes hacerlo globalmente si deseas servir el contenido de cualquier directorio.

``` bash
npm install http-server -g
```

O instalarlo como una dependencia propia dentro del proyecto/directorio para usarlo exclusivamente en él.

``` bash
npm install http-server
```

Una vez instalado, nos ubicamos en el directorio donde tenemos nuestro contenido estático y arrancamos el servidor http.

``` bash
http-server
```

A partir de este momento, ya podremos acceder al contenido de nuestro directorio a través del puerto 8080 de manera predeterminada a través de algunos de las IP ofrecidas.

``` bash
Starting up http-server, serving ./
Available on:
  http://192.168.56.1:8080
  http://10.8.0.10:8080
  http://192.168.1.39:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```

## Abrir el navegador automáticamente tras arrancar el servidor http-server

Tanto si añadimos el paquete http-server como una dependencia propia dentro de nuestro proyecto/directorio o si lo añadimos globalmente, es posible hacer que nuestro navegador predeterminado se abra automáticamente con nuestra página _index.html_ una vez se arranque el servidor.

Para ello debemos hacer uso del _package.json_ que debemos tener en nuestro directorio.
> Una manera sencilla de crear un fichero _package.json_ es ejecutar el comando ``` npm init ``` en el directorio donde lo queremos crear y responder a las preguntas del cuestionario (podemos pulsar simplemente _intro_ para dejarlas todas con la respuesta por defecto).

Debemos añadir un nuevo script al fichero _package.json_ (en el siguiente ejemplo _start_) para arrancar el servidor y a su vez abrir el navegador con la página por defecto _index.html_ (http-server sirve de manera predeterminada ese fichero para cualquier solicitud de directorio).

``` bash
{
  ...
  "scripts": {
    ...,
    "start": "http-server -o"
  },
  ...
}
```

Ahora, cuando ejecutemos el comando ```npm start``` en nuestro directorio, se iniciará el servidor y a su vez se abrirá nuestro navegador web predeterminado con la página _index.html_ de nuestro directorio.

---
<social-share class="social-share--footer" />
