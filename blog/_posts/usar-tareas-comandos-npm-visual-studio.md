---
date: 2020-5-21
tags:
  - npm
  - VisualStudio
permalink: /blog/:slug
---

# Usar tareas y comandos npm en Visual Studio (2019, 2017, 2015)

<social-share class="social-share--header" />

Como usuarios de Visual Studio solemos estar acostumbrados a que parte del trabajo pesado esté ya automatizado en el entorno de desarrollo, pero en ocasiones necesitamos ejecutar tareas o comandos de npm en nuestro proyecto como puede ser la conversión de TypeScript a JavaScript.

Para ello es posible automatizar el uso de nuestro fichero _package.json_ a través del Explorador del Ejecutador de tareas de Visual Studio (_Task Runner Explorer_).

## Instalación de NPM Task Runner

Lo que primero tendremos que hacer es instalar la extensión [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner). Con ella visualizaremos tanto los scripts predeterminados _install_ y _update_ de npm, así como los scripts personalizados que hayamos definido en nuestro fichero _package.json_.

![Visual Studio Task Runner Explorer](/blog/images/vs2019-task-runner-explorer.png)

Podemos acceder al Explorador del Ejecutador de tareas (_Task Runner Explorer_) desde el menú contextual al pulsar con el botón derecho sobre nuestro fichero _package.json_.

## Ejecución y programación de scripts

Es posible ejecutar los scripts desde el explorador haciendo doble click sobre ellos o con el botón derecho y la opción _Ejecutar_ (_Run_).

También es posible programar la ejecución de los scripts asociándolos a diferentes operaciones del proyecto (podemos asociar varias operaciones a cada script): _Antes de la compilación_ (_Before Build_), _Después de la compilación_ (_After Build_), _Limpiar compilación_ (_Clean Build_) o _Proyecto abierto_ (_Project Open_).

![Visual Studio Task Runner Explorer Bindings](/blog/images/vs2019-task-runner-explorer-bindings.png)

## Problemas con NPM Task Runner, Visual Studio 2019 y ASP.NET Core

Cuando nuestro fichero _package.json_ esté ubicado en la carpeta _wwwroot_ (u otra carpeta que no sea la raíz del proyecto), el Explorador del Ejecutador de tareas (_Task Runner Explorer_) no lo reconocerá, por lo que deberemos crear un segundo _package.json_ en la ruta raíz del proyecto en el que redefiniremos nuestros scripts.

En el nuevo fichero _package.json_ estableceremos la ruta de ejecución del script en base a nuestros recursos. Así pues, en el siguiente ejemplo añadiremos ```cd wwwroot && ``` al principio del script _build_ para el empaquetado con [Webpack](/blog/usar-webpack-4-transformar-empaquetar-recursos-aplicacion-web/) de nuestros recursos.

``` bash
{
  ...
  "scripts": {
    ...,
    "build": "cd wwwroot && webpack"
  },
  ...
}
```

---
<social-share class="social-share--footer" />
