---
date: 2020-6-5
tags: 
  - git
permalink: /:slug
---

# Cambiar la información del autor en Git

<social-share class="social-share--header" />

Cuando por algún motivo queramos cambiar el nombre o el email que están registrados en los commits de un repositorio [Git](https://git-scm.com/), será necesario reescribir todo el histórico del repositorio.

Una de las formas hacerlo es con el comando [filter-branch](https://git-scm.com/docs/git-filter-branch) creado para la reescritura de ramas. Con él podemos definir un script que se encargará de reemplazas los nombres e emails antiguos por nuevos valores.

Es muy importante recalcar que **estamos reescribiendo el histórico de nuestro repositorio** por lo que este comando debe ser usado con extremo cuidado.

Para ello debemos ejecutar el siguiente script reemplazando los valores de las variables _ANTIGUO_EMAIL_, _NUEVO_USUARIO_ y _NUEVO_EMAIL_ por nuestros datos:
``` bash
git filter-branch --env-filter '

ANTIGUO_EMAIL="antiguo@email.com"
NUEVO_EMAIL="nuevo@email.com"
NUEVO_USUARIO="Nuevo Usuario"

if [ "$GIT_COMMITTER_EMAIL"="$ANTIGUO_EMAIL" ]
then
    export GIT_COMMITTER_EMAIL="$NUEVO_EMAIL"
    export GIT_COMMITTER_NAME="$NUEVO_USUARIO"
fi
if [ "$GIT_AUTHOR_EMAIL"="$ANTIGUO_EMAIL" ]
then
    export GIT_AUTHOR_EMAIL="$NUEVO_EMAIL"
    export GIT_AUTHOR_NAME="$NUEVO_USUARIO"
fi
' --tag-name-filter cat -- --branches --tags
```

---
<social-share class="social-share--footer" />