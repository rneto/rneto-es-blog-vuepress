---
date: 2020-5-08
tags: 
  - vuepress
  - vuejs
  - blog
permalink: /:slug
---

# Crear un blog estático con VuePress

[VuePress](https://vuepress.vuejs.org) es un potente generador de sitios web estáticos basado en [Vue.js](https://vuejs.org/). Combina el uso de **markdown**, **Vue** y **webpack** para generar HTML estático pre-renderizado para cada página, que se ejecuta como una SPA una vez Vue toma el control tras la carga de una página.

Uno de los puntos claves para elegir VuePress es la variedad de plugins existentes, que permiten agregarle funcionalidades a nivel global. Puedes encontrar una completa lista de los complementos en [Awesome VuePress Plugins](https://github.com/vuepressjs/awesome-vuepress#plugins).

## Inicio rápido

La forma más sencilla de comenzar con la creación de nuestro blog es usar el paquete de npm (no es necesario instalarlo) [create-vuepress](https://github.com/vuepressjs/create-vuepress), que nos permite crear un scaffolding de un proyecto VuePress basado en el tema de blog predeterminado para [VuePress](https://vuepress-theme-blog.ulivz.com).

Paso 1. Crear el scaffolding del blog

``` bash
yarn create vuepress [miBlog]

# Y respondemos a las siguientes preguntas del CLI:

# ? Select the boilerplate type blog

# ? What's the name of your project? Mi blog

# ? What's the description of your project? Mi blog

# ? What's your email? miblog@gmail.com

# ? What's your name? Mi Blog

# ? What's the repo of your project. https://github.com/miblog/miblog

cd [miBlog] && yarn
```

> Actualmente, [create-vuepress](https://github.com/vuepressjs/create-vuepress) no instala la última versión de `@vuepress/theme-blog`, por lo que es necesario actualizarla manualmente ejecutando `yarn add @vuepress/theme-blog -D`.

Paso 2. Ejecutar y crear

``` bash
# Ejecutar localhost
yarn dev
# Por defecto, el servidor de desarrollo de VuePress estará escuchando en http://localhost:8080/

# Crear el blog
yarn build
# Los archivos del blog se habrán generado en la carpeta `.vuepress/dist`.
```
