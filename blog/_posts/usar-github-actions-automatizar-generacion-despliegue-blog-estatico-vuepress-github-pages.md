---
date: 2020-10-19
tags:
  - vuepress
  - github-actions
permalink: /blog/:slug
---

# Usar GitHub Actions para automatizar la generación y despliegue de un blog estático creado con VuePress en GitHub Pages

<social-share class="social-share--header" />

Tras unos meses con [mi blog creado con VuePress](./crear-blog-estatico-vuepress.md), he dedicido automatizar la generación y despliegue en GitHub Pages de los nuevos artículos como este.

Para ello me he basado en una acción generada en GitHub explícitamente para dicho fin llamada [Vuepress deploy](https://github.com/marketplace/actions/vuepress-deploy).

## Uso

Paso a transcribir los pasos indicados en dicha acción con una serie de apuntes de mi cosecha.

### Paso 1. Crear el fichero de la acción

Debemos crear el fichero _vuepress-deploy.yml_ en la carpeta _.github/workflows_ del directorio ráiz de nuestro repositorio de origen, es decir, en el que tenemos el código fuente de nuestro blog creado con VuePress. El contenido del fichero debe ser el siguiente:

``` yml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: vuepress-deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_REPO: tu-usuario-github/tu-repositorio-destino-blog-vuepress-compilado
        TARGET_BRANCH: master
        BUILD_SCRIPT: yarn && yarn build
        BUILD_DIR: blog/.vuepress/dist/
```

Si quieres ver cómo he configurado mi dominio personalizado _rneto.es_ de GitHub para el correcto despliegue y posterior funcionamiento de la web, échale un vistado a mi fichero [vuepress-deploy.yml](https://github.com/rneto/rneto-es-blog-vuepress/blob/master/.github/workflows/vuepress-deploy.yml), donde encontrarás la configuración CNAME necesaria.

En mi caso, he creado dichos directorios y fichero desde Visual Studio Code y cuando he intentado sincronizarlo con mi rama _master_ de origen la primera vez, me he encontrado con el siguiente error:

``` bash
[remote rejected] master -> master (refusing to allow an OAuth App to create or update workflow `.github/workflows/vuepress-deploy.yml` without `workflow` scope)
```

Al parecer es un [error identificado en Visual Studio Code](https://github.com/microsoft/vscode/issues/97396) y relacionado con las credenciales que han sido creadas con cierta antigüedad mediante Visual Studio Code como aplicación OAuth en Github.

Si a tí te llega a pasar lo mismo, puedes eliminar tus credenciales de GitHub de Windows para que Visual Studio Code te pida autenticarte nuevamente cuando vuelvas a conectarte a algún repositorio remoto de GitHub. Este manual de [cómo eliminar tus credenciales de Git de Windows](https://cmatskas.com/how-to-update-your-git-credentials-on-windows/) puede servirte como referencia.

### Paso 2. Crear un token personal en GitHub

Pulsa en el _icono de tu perfil de GitHub > Settings > Developer settings > Personal access tokens > Generate new token > Marca el check "repo"_. Entonces obtendrás un token que deberás copiar para usar en el siguiente paso (sólo lo podrás copiar en este paso).

### Paso 3: Crear una clave secreta

En tu repositorio  donde tengas tu código de VuePress, accede a _Settings > Secrets > Create a new secret y escribe ACCESS_TOKEN en la caja "Name" y pega el token personal en la caja "Value".

Con estos simples pasos, al publicar un nuevo cambio en el repositorio de origen, automáticamenet se generarán y publicarán tus cambios en el repositorio de destino donde tengas tu blog VuePress compilado.

---
<social-share class="social-share--footer" />