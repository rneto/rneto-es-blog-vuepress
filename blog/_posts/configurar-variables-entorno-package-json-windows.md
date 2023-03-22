---
date: 2021-6-17
tags:
  - Nodejs
  - npm
permalink: /blog/:slug
canonicalUrl: https://rafaelneto.dev/blog/configurar-variables-entorno-package-json-windows/
---

# Configurar el uso de variables de entorno en package.json para Windows

<social-share class="social-share--header" />

Para los que somos usuarios de Windows y a la vez desarrolladores de aplicaciones con _Node.js_, es común que nos encontremos con problemas que los usuarios de Linux/MAC felizmente desconocen (otros tendrán seguro…).

Uno de esos problemas está relacionado con el uso de variables de entorno definidas en los scripts configurados de nuestros ficheros _package.json_:

``` bash
{
  ...,
  "scripts": {
    ...,
    "generate-es-v1": "LANGUAGE=ES VERSION=1 npx nuxt generate",
    "generate-es-v2": "LANGUAGE=ES VERSION=2 npx nuxt generate",
    "generate-en-v1": "LANGUAGE=EN VERSION=1 npx nuxt generate",
    "generate-en-v2": "LANGUAGE=EN VERSION=2 npx nuxt generate",
    ...
  },
  ...,
}
```
_package.json_

En este caso, cuando ejecutemos desde la consola de Windows el comando `npm run generate-es-v1`, obtendremos el error _'LANGUAGE' is not recognized as an internal or external command, operable program or batch file_.

## _cross-env_ al rescate

Una forma de solucionar este problema es hacer nuestros scripts _multiplataforma_,  añadiendo para ello el paquete [cross-env]( https://github.com/kentcdodds/cross-env) como dependencia de desarrollo adicional a nuestro proyecto. Este paquete se encargará de añadir nuestras variables de entorno antes de que se ejecute nuestro script.

Para ello tendremos que:

1. Instalar el paquete con `npm install --save-dev cross-env`.
1. Añadir un nuevo comando ` cross-env` al principio de nuestros scripts:
    ``` bash
    {
      ...,
      "scripts": {
        ...,
        "generate-es-v1": "cross-env LANGUAGE=ES VERSION=1 npx nuxt generate",
        "generate-es-v2": "cross-env LANGUAGE=ES VERSION=2 npx nuxt generate",
        "generate-en-v1": "cross-env LANGUAGE=EN VERSION=1 npx nuxt generate",
        "generate-en-v2": "cross-env LANGUAGE=EN VERSION=2 npx nuxt generate",
        ...
      },
      ...,
    }
    ```
1. Y finalmente ejecutar nuestro script como teníamos previsto `npm run generate-es-v1`.

Es cierto que el proyecto de _cross-env_ se puso en modo mantenimiento a finales del año 2020 por lo que no se agregarán nuevas funcionalidades, sin embargo, sigue siendo completamente válido ya que se seguirán corrigiendo errores y actualizando para futuras versiones de Node.js.

En todo caso, siempre nos quedará la opción de hacer uso del [subsistema de Windows para Linux]( https://docs.microsoft.com/en-us/windows/wsl/about), ¿te atreves?

---
<social-share class="social-share--footer" />
