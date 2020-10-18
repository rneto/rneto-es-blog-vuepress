---
date: 2020-10-18
tags:
  - vuepress
  - github-actions
permalink: /:slug
---

# Usar GitHub Actions para automatizar la generación y despliegue de un blog estático creado con VuePress en GitHub Pages

<social-share class="social-share--header" />

Tras unos meses con [mi blog creado con VuePress](./crear-blog-estatico-vuepress.md), he dedicido automatizar la generación y despliegue en GitHub Pages de los nuevos artículos como este.

Para ello me he basado en una acción generada en GitHub explícitamente para dicho fin llamada [Vuepress deploy](https://github.com/marketplace/actions/vuepress-deploy).

## Uso

Paso a transcribir los pasos indicados en dicha acción con una serie de apuntes de mi cosecha.

**Paso 1. Crear el fichero de la acción**

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

En mi caso, he creado dichos directorios y fichero desde Visual Studio Code y cuando he intentado sincronizarlo con mi rama _master_ de origen, he tenido el error:

``` bash
[remote rejected] master -> master (refusing to allow an OAuth App to create or update workflow `.github/workflows/vuepress-deploy.yml` without `workflow` scope)
```

Al parecer es un [error identificado en GitHub](https://github.com/microsoft/vscode/issues/97396) y relacionado con las credenciales que han sido creadas con cierta antigüedad mediante Visual Studio Code como aplicación OAuth en Github.

Si a tí te llega a pasar lo mismo, puedes eliminar tus credenciales de GitHub de Windows para que Visual Studio Code te pida autenticarte nuevamente cuando vulvas a conectarte a algún repositorio remoto de GitHub. Este manual de como [eliminar tus credenciales de Git de Windows](https://cmatskas.com/how-to-update-your-git-credentials-on-windows/) puede servirte como referencia.

**Paso 2. Crear un token personal en GitHub**

Pulsa en el _icono de tu perfil de GitHub > Settings > Developer settings > Personal access tokens > Generate new token > Marca el check "repo"_. Entonces obtendrá un token que deberás copiar (sólo lo podrás copiar en este paso).

**Paso 3: Crear una clave secreta**

En tu repositorio accede a _Settings > Secrets > Create a new secret y escribe ACCESS_TOKEN en la caja "Name" y pega el token personal en la caja "Value".

Con estos simples pasos, al publicar un nuevo cambio en el repositorio donde tienes el código fuente de tu blog VuePress, automáticamenet se publicarán tus cambios en el otro repositorio donde sólo tienes tu blog VuePress compilado.

---
<social-share class="social-share--footer" />