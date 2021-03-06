---
date: 2020-12-23
tags:
  - CSS
permalink: /blog/:slug
---

# Sobre la propiedad CSS _box-sizing_

<social-share class="social-share--header" />

La importancia de la propiedad CSS _box-sizing_ reside en que determina la manera en la que se calculan el ancho y alto de un elemento.

De manera predeterminada, el ancho y alto (también ancho y alto máximos) que indiquemos para un elemento sólo afectarán a su contenido, con lo que su tamaño total se verá incrementado por los valores del _padding_ (relleno) y _border_ (límite del elemento).

Dicho comportamiento se deriva del valor por defecto de la propiedad CSS _box-sizing_ que está establecido en _content-box_.

``` html
<div class="box-sizing-default">
    box-sizing default
</div>
<div class="box-sizing-default box-sizing-default--styled">
    styled box-sizing default
</div>
```

``` css
.box-sizing-default {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.box-sizing-default--styled {
  border: 10px solid;
  padding: 20px;
}
```

<style>
.box-sizing-default {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.box-sizing-default--styled {
  border: 10px solid;
  padding: 20px;
}
</style>

<div class="box-sizing-default">
    box-sizing default
</div>
<div class="box-sizing-default box-sizing-default--styled">
    styled box-sizing default
</div>

## _box-sizing: border-box_

Con el uso del valor _border-box_ de la propiedad _box-sizing_, tanto el _padding_ como _border_ de nuestro elemento estarán incluidos en el ancho y alto del mismo, con lo que nos garantizaremos que el tamaño del elemento se ajuste a lo que esperamos, aunque alteremos su relleno o límites.

``` html
<div class="box-sizing-border-box">
    box-sizing border-box
</div>
<div class="box-sizing-border-box box-sizing-border-box--styled">
    styled box-sizing border-box
</div>
```

``` css
.box-sizing-border-box {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.box-sizing-border-box--styled {
  border: 10px solid;
  padding: 20px;
}
```

<style>
.box-sizing-border-box {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 200px;

  background: #ffff99;
  color: #333;
}

.box-sizing-border-box--styled {
  border: 10px solid;
  padding: 20px;
}
</style>

<div class="box-sizing-border-box">
    box-sizing border-box
</div>
<div class="box-sizing-border-box box-sizing-border-box--styled">
    styled box-sizing border-box
</div>

---
<social-share class="social-share--footer" />
