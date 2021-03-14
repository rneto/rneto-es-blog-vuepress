---
date: 2021-03-08
tags:
  - TailwindCSS
permalink: /blog/:slug
---

# ¿Qué es Tailwind CSS?

<social-share class="social-share--header" />

[Tailwind CSS](https://tailwindcss.com/) es un framework CSS que proporciona una serie de utilidades de bajo nivel que nos permite crear diseños completamente personalizados en base a la composición de clases.

Desde su aparición a finales de 2017 su incorporación a miles de proyectos cada día es indiscutible, habiendo llegado a finales de febrero del 2021 a las casi 700.000 instalaciones diarias de su paquete en _npm_ (con el permiso de Bootstrap que llega ya a las 3.200.000 descargas diarias de su paquete en _npm_).

Una de las principales ventajas que ofrece Tailwind CSS es en cuanto al sistema de diseño que plantea, ya que podríamos considerarlo un framework CSS progresivo, es decir, que podemos adoptarlo de manera completa sin más ayudas para crear un diseño atractivo o podemos adoptarlo parcialmente y de manera compatible con nuestro sistema de diseño actual, ya que no cuenta con componentes prediseñados como puede ser Bootstrap, sino que en base a sus clases de utilidades, nos ayuda a diseñar nuestros propios componentes combinando dichas clases.

Otra gran ventaja de Tailwind CSS está relacionada con el tamaño de nuestros despliegues, ya que mediante el uso de preprocesadores CSS es posible reducir considerablemente el tamaño del archivo de estilos de nuestro proyecto mediante el escaneo de nuestros ficheros HTML para la eliminación de las clases Tailwind CSS no utilizadas.

Este sería un claro ejemplo de qué podemos llegar a hacer con Tailwind CSS:

``` html
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <img src="https://rneto.es/images/logo.png" class="h-7 sm:h-8" />
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <p>Tailwind CSS is a great CSS framework option to start my projects.</p>
              <ul class="list-disc space-y-2">
                <li class="flex items-start">
                  <span class="h-6 flex items-center sm:h-7">
                    <svg class="flex-shrink-0 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <p class="ml-2">
                    It’s flexible!
                  </p>
                </li>
                <li class="flex items-start">
                  <span class="h-6 flex items-center sm:h-7">
                    <svg class="flex-shrink-0 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <p class="ml-2">
                    It's customizable!
                  </p>
                </li>
                <li class="flex items-start">
                  <span class="h-6 flex items-center sm:h-7">
                    <svg class="flex-shrink-0 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <p class="ml-2">
                    It's progressive and compatible with my current designs!
                  </p>
                </li>
              </ul>
            </div>
            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>
                <a href="https://rneto.es" class="text-green-600 hover:text-green-700"> Rafael Neto </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
```

Y este sería el resultado:

<style>
  .responsive-embed {
    /*position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;*/

    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 100%;
  }

  .responsive-embed::before {
    /*padding-top: 56.25%;*/
  }

  .responsive-embed::before {
    /*display: block;
    content: "";*/
  }

  .responsive-embed__element,
  .responsive-embed embed,
  .responsive-embed iframe,
  .responsive-embed object,
  .responsive-embed video {
    /*position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    background-color: #222;

    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;*/

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>

<div class="responsive-embed">
  <iframe src="https://htmlpreview.github.io/?https://github.com/rneto/mini-projects/blob/master/basic-tailwind-css/index.html"></iframe>
</div>

Puedes ver el código completo del anterior ejemplo al que he llamado [Basic Tailwind CSS](https://github.com/rneto/mini-projects/tree/master/basic-tailwind-css) en mi repositorio de GitHub [Mini projects](https://github.com/rneto/mini-projects).

Y si quieres profundizar un poco más sobre Tailwind CSS con Angular e inclusive Angular Material, te sugiero visitar mi artículo sobre [cómo integrar Tailwind CSS con Angular Material en una aplicación Angular](./integrar-tailwind-css-angular-material.md).

---
<social-share class="social-share--footer" />
