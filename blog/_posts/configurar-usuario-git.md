---
date: 2020-5-14
tags: 
  - git
permalink: /:slug
---

# Configurar el usuario en Git

<social-share class="social-share--header" />

Cuando realizas commits en tu repositorio local, git hace uso de la configuración de usaurio que se haya establecido durante su instalación.

Para asegurarnos de que en los commits que realicemos figure la información correcta en cuanto a usuario e email, es posible reescribirla a nivel global o inclusive **establecer la configuración de usuario de Git a nivel de repositorio**.

## Configurar el usuario e email en Git a nivel global

Ejecuta desde la línea de comandos:
``` bash
git config --global user.name "Mi Nombre"
git config --global user.email "miemail@ejemplo.com"
```

## Configurar el usuario e email en Git para un repositorio específico

Ejecuta desde la línea de comandos en la carpeta de tu repositorio:
``` bash
git config user.name "Mi Nombre"
git config user.email "miemail@ejemplo.com"
```

---
<social-share class="social-share--footer" />