---
date: 2020-12-1
tags:
  - css
permalink: /blog/:slug
---

# _PODICOTEO_ para la ordenación de las propiedades CSS

<social-share class="social-share--header" />

Aquí humildemente propongo el nombre para una técnica que he visto aplicada de forma relativamente similar y extendida para la ordenación de las propiedades CSS dentro de una clase, y donde se usa el criterio de ordenación identificando diferentes bloques de propiedades _de fuera hacia adentro_ del elemento que estemos manipulando.

De esta manera podríamos definir los siguientes bloques de agrupación de propiedades:

1. _**PO**-sition_ (bottom, clear, float, left, position, right, top, z-index)
1. _**DI**-splay y Box Model_ (border, box-sizing, content, display, height, margin, max-width, overflow, padding, visibility, width)
1. _**CO**-lor_ (color, background, background-color, background-image, background-repeat, background-attachment, background-position, box-shadow, opacity)
1. _**TE**-xt_ (direction, font-size, font-family, letter-spacing, line-height, text-align, text-decoration, text-indent, text-shadow, text-transform, vertical-align)
1. _**O**-ther_ (cursor, overflow)


Tomemos como punto de partida la siguiente clase que podría servir para por ejemplo sobreponer un _DIV_ sobre el contenido de nuestra página y donde no se ha aplicado aún la técnica _PODICOTEO_:


``` css
.overlay {
    z-index: 1000;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgb(255, 255, 255);
    opacity: 0.95;
    cursor: wait;
    position: fixed;
}
```

Al aplicar la técnica _PODICOTEO_ tendríamos el siguiente resultado:


``` css
.overlay {
    left: 0px;
    position: fixed;
    top: 0px;
    z-index: 1000;

    border: none;
    height: 100%;
    margin: 0px;
    padding: 0px;
    width: 100%;

    background-color: rgb(255, 255, 255);
    opacity: 0.95;

    cursor: wait;
}
```

Como podemos comprobar, agrupando las propiedades por tipo y posteriormente ordenándolas alfabéticamente (también soy partidario de añadir una línea en blanco entre grupos), se facilita el entendimiento del comportamiento de la clase, a la vez que permite identificar en qué parte de la misma debemos poner el foco cuando queramos realizar futuras modificaciones.


---
<social-share class="social-share--footer" />