---
date: 2021-9-18
tags:
  - Angular
permalink: /blog/:slug
canonicalUrl: https://rafaelneto.dev/blog/configurar-generar-angular-multiples-entornos-personalizados/
---

# Configurar y generar aplicaciones Angular para múltiples entornos personalizados

<social-share class="social-share--header" />

Cuando generamos una aplicación con Angular CLI, la plantilla inicial de los ficheros _package.json_, _angular.json_ y _environments.ts_ solo cuentan de manera predeterminada con la configuración para los entornos de desarrollo y producción, así que ¿cómo podemos extender esa configuración para poder definir nuevos entornos personalizados?

Para ello voy a plantear una serie de cambios sobre dichas plantillas con lo que finalmente tendremos la configuración para cuatro entornos de implementación:

- _default_: Será el entorno predeterminado de ejecución local.
- _development_: Será el entorno de desarrollo.
- _staging_: Será el entorno de preproducción.
- _production_: Será el entorno de producción.

## Extender la configuración de la plantilla inicial de _package.json_

Esta es la sección _scripts_ de un fichero _package.json_ estándar de una aplicación Angular:

``` js
…,
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
…,
```
_package.json_

Y esta sería la misma sección del fichero aplicando las modificaciones que propongo:

``` js
…,
  "scripts": {
    "ng": "ng",
    "start": "ng serve -o",
    "start:development": "ng serve -o --configuration=development",
    "start:staging": "ng serve -o --configuration=staging",
    "start:production": "ng serve -o --configuration=production",
    "build": "ng build",
    "build:development": "ng build --configuration=development",
    "build:staging": "ng build --configuration=staging",
    "build:production": "ng build --configuration=production",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "stats": "ng build --stats-json & webpack-bundle-analyzer dist/my-app/stats.json"
  },
…,
```
_package.json_

Y cuyos cambios realizados han sido:

- Se agregan tantos comandos `start` como entornos (`start:development`, `start:staging`, y `start:production`) con el parámetro `--configuration` establecido con el nombre de cada entorno (veremos su explicación cuando veamos el fichero _angular.json_).
- Se agregan tantos comandos `build` como entornos (`build:development`, `build:staging` y `build:production`) también con el parámetro `--configuration` establecido con el nombre de cada entorno.
- Al comando `ng serve` he añadido la opción `--o`, que aunque no sea relevante para la configuración por entorno, sí que nos hace más cómoda la ejecución de la aplicación al hacer que se abra automáticamente nuestro navegador predeterminado.
- Y para terminar también he añadido como mejora al fichero, más allá de la configuración por entorno, el comando `stats` para el [análisis de paquetes npm con webpack](/blog/optimizar-angular-analisis-paquetes-npm-webpack/).

## Extender la configuración de la plantilla inicial de _angular.json_

Estas son las secciones _architect.build.configurations_ y _architect.serve_ de un fichero _angular.json_ estándar de una aplicación Angular:

``` js
…,
  "architect": {
    "build": {
      ...,
      "configurations": {
        "production": {
          "fileReplacements": [
            {
              "replace": "src/environments/environment.ts",
              "with": "src/environments/environment.prod.ts"
            }
          ],
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "buildOptimizer": true,
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "4kb"
            }
          ]
        }
      }
    },
    "serve": {
      ...,
      "configurations": {
        "production": {
          "browserTarget": "my-app:build:production"
        }
      }
    },
    ...,
  }
…,
```
_angular.json_

Y estas serían las mismas secciones del fichero aplicando las modificaciones que propongo:

``` js
…,
  "architect": {
    "build": {
      ...,
      "configurations": {
        "development": {
          "fileReplacements": [
            {
              "replace": "src/environments/environment.ts",
              "with": "src/environments/environment.development.ts"
            }
          ],
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "buildOptimizer": true,
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "4kb"
            }
          ]
        },
        "staging": {
          "fileReplacements": [
            {
              "replace": "src/environments/environment.ts",
              "with": "src/environments/environment.staging.ts"
            }
          ],
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "buildOptimizer": true,
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "4kb"
            }
          ]
        },
        "production": {
          "fileReplacements": [
            {
              "replace": "src/environments/environment.ts",
              "with": "src/environments/environment.production.ts"
            }
          ],
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "buildOptimizer": true,
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "4kb"
            }
          ]
        },
      }
    },
    "serve": {
      ...,
      "configurations": {
        "development": {
          "browserTarget": "my-app:build:development"
        },
        "staging": {
          "browserTarget": "my-app:build:staging"
        },
        "production": {
          "browserTarget": "my-app:build:production"
        }
      }
    },
    ...,
  }
…,
```
_angular.json_

Y cuyos cambios realizados han sido:

- Bajo la sección _architect.build.configurations_ se agregan tantas configuraciones como entornos personalizados hayamos definido (el _default_ usará la configuración por defecto de desarrollo de Angular, como el fichero _environment.ts_). Estas configuraciones deben corresponder con los nombres especificados en el parámetro `--configuration` de los comandos `start` y `build` personalizados que hemos creado en el fichero _package.json_. Como el fichero ya incluye la configuración _production_, sólo tenemos que crear las configuraciones _development_ y _staging_.
- En cada configuración creada bajo la sección _architect.build.configurations_, hemos personalizado los nombres de los ficheros de entorno (sección _fileReplacements_) que vamos a usar, en nuestro caso _environment.development.ts_, _environment.staging.ts_ y _environment.production.ts_ (hemos sustituido el nombre del fichero original _environment.prod.ts_ para mantener la coherencia con los nuevos que hemos creado).
- A la sección _architect.serve_ hemos añadido los dos nuevos entornos que nos faltaban (_devlopment_ y _staging_) dado que el de producción ya estaba creado.

## Extender la configuración de la plantilla inicial de _environment.ts_

Dado que ya contamos con los ficheros de configuración de entorno _environment.ts_ y _environment.prod.ts_, lo único que tenemos que hacer es:

- Crear los nuevos ficheros _environment.development.ts_ y _environment.staging.ts_.
- Modificar el nombre del fichero _environment.prod.ts_ por _environment.production.ts_.

## Usar la configuración personalizada según entorno de ejecución

A partir de este momento ya podemos arrancar nuestra aplicación o empaquetarla para cada uno de los entornos definidos de la siguiente manera:

``` bash
npm run start
npm run start:development
npm run start:staging
npm run start:production

npm run build
npm run build:development
npm run build:staging
npm run build:production
```

> En el caso del comando `start`, podríamos obviar el comando `run` que le precede y simplificarlo con `npm start` ya que por sí mismo `start` es un comando de _npm_.

---
<social-share class="social-share--footer" />
