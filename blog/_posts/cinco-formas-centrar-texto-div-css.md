---
date: 2021-8-18
tags:
  - CSS
  - HTML
permalink: /blog/:slug
---

# Cinco formas de centrar el texto en un div con CSS

<social-share class="social-share--header" />

Aquí presento una lista de cinco técnicas para centrar el texto en un div mediante CSS.


## 1. Método _flexbox_

Flexbox nos permite definir de una manera eficiente la alineación y posición de nuestros elementos. Para ello haremos uso de la alineación horizontal (_justify-content_) y vertical (_align-items_) propias de flexbox cuando asumimos el valor inicial de _flex-direction: row_.

``` html
<div class="flexbox">
  flexbox
</div>
```

``` css
.flexbox {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 200px;

  background: #ffff99;
  color: #333;
}
```

<style>
.flexbox {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 200px;

  background: #ffff99;
  color: #333;
}
</style>

<div class="flexbox">
  flexbox
</div>

> Podemos simplificar más aún este ejemplo usando sólo ```display: grid;``` y ```place-items: center;``` en lugar de ```display: flex;```, ```align-items: center;``` y ```justify-content: center;```.

## 2. Método _margin auto_

Esta técnica se basa en usar la propiedad _margin_ del elemento que queremos alinear para así distanciarlo de los bordes de su contenedor y conseguir el efecto de centrado deseado. Si la combinamos con las características de flexbox, también podemos conseguir la alineación vertical de nuestro texto:

``` html
<div class="margin-auto">
  <span class="margin-auto__content">
    margin auto
  </span>
</div>
```

``` css
.margin-auto {
  display: flex;
  height: 100px;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.margin-auto__content {
  margin: auto;
}
```

<style>
.margin-auto {
  display: flex;
  height: 100px;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.margin-auto__content {
  margin: auto;
}
</style>

<div class="margin-auto">
  <span class="margin-auto__content">
    margin auto
  </span>
</div>

## 3. Método _text align center_

Es la técnica clásica más sencilla y se basa en la alineación del texto mediante el uso de la propiedad _text-align_ del elemento padre.

También es posible centrar el texto verticalmente mediante el uso de la propiedad _vertical-align_ en combinación con la propiedad _line-height_ (debe establecerse con la misma altura que el contenedor del texto, por lo que suele usarse en contenedores con alto fijo):

``` html
<div class="text-align-center">
  text align center
</div>
```

``` css
.text-align-center {
  height: 100px;
  width: 200px;

  background: #ffff99;
  color: #333;

  line-height: 100px;
  text-align: center;
  vertical-align: middle;
}
```

<style>
.text-align-center {
  height: 100px;
  width: 200px;

  background: #ffff99;
  color: #333;

  line-height: 100px;
  text-align: center;
  vertical-align: middle;
}
</style>

<div class="text-align-center">
  text align center
</div>

## 4. Método _position absolute_

Esta técnica permite establecer la ubicación del texto en cualquier parte de su contenedor. En nuestro caso, como deseamos centrarlo, primero establecemos el eje superior izquierdo de nuestro texto en el centro de tu contenedor con las propiedades _top_ y _left_ al 50% y finalmente lo desplazamos con la propiedad _transform_ un 50% a la izquierda y hacia arriba para que acabe centrado respecto a su contenedor.

Al establecer la posición absoluta, estamos eliminando el elemento del flujo de la página, por lo que es importante tener en cuenta de que mal usada, esta técnica puede provocar la sobreposición de elementos de manera no deseada.

``` html
<div class="position-absolute">
  <span class="position-absolute__content">
    position absolute
  </span>
</div>
```

``` css
.position-absolute {
  position: relative;

  height: 100px;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.position-absolute__content {
  left: 50%;
  position: absolute;
  top: 50%;

  transform: translate(-50%, -50%);
}
```

<style>
.position-absolute {
  position: relative;

  height: 100px;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.position-absolute__content {
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}
</style>

<div class="position-absolute">
  <span class="position-absolute__content">
    position absolute
  </span>
</div>

## 5. Método _table cell_

Cuando nuestro elemento contenedor no tenga un alto ni ancho fijos, sino que está adaptado al 100% de su elemento padre (suele usarse por ejemplo cuando al elemento _html_ o _body_ se establecen al 100%), podemos establecer la propiedad _display: table-cell;_ para extender el tamaño de nuestro texto hasta el tamaño de su contenedor, al cual también debemos añadir la propiedad _display: table;_. Una vez extendido nuestro elemento, ya podemos centrar el texto como en el método 3.

``` html
<div class="table-cell">
  <div class="table-cell__container">
    <span class="table-cell__content">
      table cell
    </span>
  </div>
</div>
```

``` css
.table-cell {
  height: 100px;
  width: 200px;
}

.table-cell__container {
  display: table;
  height: 100%;
  width: 100%;
}

.table-cell__content {
  display: table-cell;

  text-align: center;
  vertical-align: middle;

  background: #ffff99;
  color: #333;
}
```

<style>
.table-cell {
  height: 100px;
  width: 200px;
}

.table-cell__container {
  display: table;
  height: 100%;
  width: 100%;
}

.table-cell__content {
  display: table-cell;

  text-align: center;
  vertical-align: middle;

  background: #ffff99;
  color: #333;
}
</style>

<div class="table-cell">
  <div class="table-cell__container">
    <span class="table-cell__content">
      table cell
    </span>
  </div>
</div>

---
<social-share class="social-share--footer" />
