---
date: 2021-1-24
tags:
  - nodejs
  - nvm
  - npm
permalink: /blog/:slug
---

# Instalar múltiples versiones de Node.js en Windows

<social-share class="social-share--header" />

Una vez nos hemos sumergido en los nuevos frameworks y entornos de trabajo front end modernos, vamos a empezar a encontrarnos con que cada uno de nuestros proyectos puede haber sido creado con una versión diferente de Node.js, lo que implica que debamos empezar a tener en cuenta la versión mínima y máxima soportada de cada paquete _npm_ en cada versión de Node.js. Es el caso por ejemplo del paquete [node-sass](https://github.com/sass/node-sass), cuyas versiones mínimas y máximas compatibles con Node.js son:

Node.js  | Versión node-sass soportada
--------|----------------------------
Node 15 | 5.0+
Node 14 | 4.14+
Node 13 | 4.13+, <5.0
Node 12 | 4.12+
Node 11 | 4.10+, <5.0
Node 10 | 4.9+
Node 8  | 4.5.3+, <5.0
Node <8 | <5.0

Poniéndonos en este contexto, podría darse el caso por ejemplo de que por algún motivo no hemos podido aún migrar un _viejo_ proyecto Angular de la versión 7.0.0 a la más actual. En ese caso, si queremos seguir trabajando en él sin realizar la migración, nos encontraremos en nuestro fichero _package.json_ la dependencia ```"@angular-devkit/build-angular": "~0.7.0"```, que a su vez depende de ```"node-sass": "^4.9.3"```. Esto implica que en lugar de trabajar con la versión más actual de Node.js, deberíamos hacerlo (según la tabla anterior) con la versión _10.x_ de Node.js, ya que en caso contrario tendríamos problemas con el uso de librerías dependientes como _node-sass_.

## Node Version Manager (nvm) al rescate

Ahora que ya no hay marcha atrás, toca descubrir herramientas como [nvm windows](https://github.com/coreybutler/nvm-windows) que nos permitirá administratar en nuestro equipo Windows múltiples instalaciones de Node.js. Si eres usuario de Max o Linux, debes usar el proyecto [nvm](https://github.com/creationix/nvm), muy similar pero exclusivo para dichos entornos.

### Instalación

En primer lugar, **es muy importante para evitar futuros conflictos entre versiones**, que desinstalemos de nuestro ordenador cualquier versión previa de Node.js, así como toda referencia a dicha instalación mediante la eliminación de los directorios de instalación _C:\Program Files\nodejs_ y de instalación npm _C:\Users\<user>\AppData\Roaming\npm_. Acuérdate antes de hacer un backup de la configuración _C:\Users\<user>\AppData\Roaming\npm\etc\npmrc_ o copiarla a la configuración de usuario _C:\Users\<user>\.npmrc_.

[Descárgate el último instalador](https://github.com/coreybutler/nvm/releases) (_nvm-setup.zip_) y completa la instalación.

### Uso

Escribiendo simplemente el comando ```nmv``` en nuestro terminal, tendremos una lista de todas las opciones disponibles.

#### Instalación de Node.js

Basta con que usemos el comando ```nvm install [version]``` para que instalemos la versión de Node.js que queramos tener disponible. Debemos tener derechos administrativos de Windows para ejecutar este comando.

#### Cambio de version Node.js a usar

Usando el comando ```nvm use [version]``` indicaremos qué versión de Node.js queremos usar. Debemos tener derechos administrativos de Windows para ejecutar este comando.

Una vez establecida la versión en uso, ya podemos trabajar con ella con los comandos habituales, ```npm i``` por ejemplo.

Debemos tener en cuenta que a partir de este momento, debemos instalar cada utilidad global que necesitemos en cada una de las version de Node.js que vayamos a mantener. Es el caso por ejemplo de _yarn_, cuyas versiones deberemos instalar por cada instancia de Node.js.

``` bash
nvm install 10.23.1
nvm use 10.23.1
npm install -g yarn
nvm install 12.20.1
nvm use 12.20.1
npm install -g yarn
nvm install 15.6.7
nvm use 15.6.7
npm install -g yarn
```

#### Consultar las instalaciones existentes de Node.js

Con el comando ```nvm install list``` nos mostrará la lista de versiones Node.js instaladas, así como la versión actualmente activa.

---
<social-share class="social-share--footer" />