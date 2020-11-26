---
date: 2020-11-26
tags:
  - aspnet
  - dotnetcore
  - iis
  - webdeploy
  - visualstudio
permalink: /blog/:slug
---

# Publicar aplicaciones ASP.NET Core en IIS con Web Deploy mediante perfiles de publicación de Visual Studio y diferenciando entornos de implementación

<social-share class="social-share--header" />

Los [perfiles de publicación de Visual Studio](https://docs.microsoft.com/es-es/aspnet/core/host-and-deploy/visual-studio-publish-profiles) son archivos de configuración donde se almacena la información de publicación de los servicios que contiene un proyecto. Con ellos podemos automatizar y simplificar la creación del conjunto de ficheros que permiten la ejecución de una aplicación y el despliegue de dichos ficheros a una máquina o servicio de destino.

La creación de múltiples perfiles de publicación en un mismo proyecto es una manera básica de facilitar las tareas de despliegue cuando tenemos una arquitectura de sistemas basada en múltiples niveles de implementación y debemos hacer el despliegue del software en cada uno de ellos. Los entornos o niveles de implementación que se suelen contemplar en los depliegues son:
- **Entorno de desarrollo (_Development_)**: es el entorno usado por los programadores y donde se desarrollan los cambios en el software.
- **Entorno de pruebas (_Testing_)**: es el entorno donde se realizan las pruebas unitarias, bien automáticas o humanas.
- **Entorno de pre-producción (_Staging_)**: es el entorno usado por el cliente para comprobar las características implementadas antes de su puesta en producción.
- **Entorno de producción (_Production_)**: es el entorno con el que los usuarios finales interactúan.

## ¿Cómo crear un perfil de publicación?

Los siguientes pasos están basados en Visual Studio 2019 o versiones superiores. Un mismo proyecto puede tener múltiples perfiles de publicación por lo que crearemos uno por cada entorno de implementación. Pasos a seguir:

- En el _Explorador de soluciones_ de Visual Studio, pulsamos con el botón derecho en el proyecto y seleccionamos la opción _Publicar_. Otra alternativa es seleccionar el proyecto y seleccionar _Publicar {NOMBRE DEL PROYECTO}_ en el menú _Compilar_.
- Si el proyecto no contiene previamente ningún perfil de publicación, se mostrará la página para elegir un destino de publicación.
- Si previamente teníamos configurado algún perfil de publicación, aparecerá la pestaña _Publicar_ de la página de funcionalidades de la aplicación. En ese caso, seleccionamos la opción _Nuevo_ que aparece debajo de la lista desplegable de perfiles.
- En la ventana _Publicar_, elegimos _Servidor web (IIS)_.
- Elegimos seguidamente _Web Deploy_ como método de implementación.
- Configuramos las opciones necesarias del método de publicación y seleccionamos _Finalizar_. Las opciones mínimas que debemos configurar son:
  - _Servidor_: La ruta del servidor de destino de la publicación.
  - _Nombre del sitio_: El nombre del sitio web del IIS del servidor de destino de la publicación.
- Una vez creado el perfil de publicación, cambia el contenido de la pestaña _Publicar_ y el perfil recién creado aparecerá en una lista desplegable.

Por cada perfil de publicación, Visual Studio genera un archivo [MSBuild](https://docs.microsoft.com/es-es/visualstudio/msbuild/msbuild) ubicado en la ruta _Properties/PublishProfiles/{NOMBRE DEL PERFIL}.pubxml_ con toda la información de la configuración de publicación y que es posible modificar para personalizar el proceso de compilación y publicación del proyecto.

### Perfiles de publicación y configuración en ASP.NET Core

Cuando hacemos uso de la [configuración en ASP.NET Core](https://docs.microsoft.com/es-es/aspnet/core/fundamentals/configuration) mediante archivos de configuración como _appsetting.json_ o _appsettings.{Entorno}.json_, es necesario hacer un ajuste manual en el fichero de publicación _.pubxml_ previamente generado para agregarle el _entorno de ejecución_ que estamos desplegando. Según los niveles de implementación antes mencionados, deberíamos usar los valores _Development_, _Testing_, _Staging_ o _Production_ de la siguiente manera:

```xml
  <PropertyGroup>
    ...
    <EnvironmentName>Staging</EnvironmentName>
  </PropertyGroup>
```

Agregando dicha configuración, nos aseguraremos de que cuando publiquemos nuestra aplicación ésta hará uso del fichero de configuración del entorno que hayamos establecido en el nodo _EnvironmentName_. El proceso por el que se aplicará dicha configuración será mediante la creación automática de un fichero _web.config_ en el que se indicará de manera explícita la varialble de entorno _ASPNETCORE_ENVIRONMENT_ con el valor que hayamos establecido en nuestro nuevo nodo.


## Creación del entorno de ejecución en IIS 8 o posterior

Para poder publicar nuestro proyecto en el servidor IIS, previamente debemos haber preparado el entorno de ejecución siguiendo los siguientes pasos en el servidor de publicación:

1. Instalar la versión de .NET Core que use nuestro proyecto. Será necesario instalar la opción _ASP.NET Core Hosting Bundle_ y en algunos casos es posible que sea también necesario reiniciar la máquina.
1. Instalar el certificado SSL del cual hará uso nuestra aplicación.
   - Podemos hacerlo mediante la obtención del fichero _pfx_ de nuestro certificado con la clave privada incluida y el uso de la herramienta _mmc.exe_ (Microsoft Management Console) para su importación a través del _Snap-in_ _Certificates_ a nivel de _Computer account_.
1. Instalar IIS Web Deploy.
   - Web Deploy es una extensión de IIS ofrecida por Microsoft para la implementación de aplicaciones web en servidores IIS.
   - Podemos descargarnos directamente el [instalador](https://www.iis.net/downloads/microsoft/web-deploy) desde la web de IIS.
   - Otros [métodos de instalación de Web Deploy en IIS 8.0 y posterior](https://docs.microsoft.com/en-us/iis/install/installing-publishing-technologies/installing-and-configuring-web-deploy-on-iis-80-or-later).
1. Crearemos el directorio físico donde alojaremos nuestra aplicación.
1. Añadiremos al IIS un nuevo sitio web
   - El nuevo sitio apuntará a la ruta física del directorio que hemos creado para alojar la aplicación.
   - Al nuevo sitio creado se le asignará a un nuevo pool propio, sin código gestionado (_No Managed Code_).
   - Asignaremos al nuevo sitio web el certificado que hemos importado previamente a través del apartado _Bindings_ de la sección _Actions_ del IIS, mediante la creación de una entrada para el protocolo _https_. Si necesitáramos configurar más de un certificado en una misma IP, tendremos que activar la opción _Require Server Name Indication_.


## Errores comunes durante el proceso de publicación y al consumir servicios publicados

Cuando intentemos realizar la publicación de nuestro proyecto o bien intentemos consumir los servicios de dicho proyecto una vez publicados, podemos encontrarnos con algunos errores comunes como los de de a continuación.

Recordemos que la publicación de un proyecto se puede realizar desde el _Explorador de soluciones_ de Visual Studio, pulsamos con el botón derecho en el proyecto y seleccionamos la opción _Publicar_ o como alternativa seleccionando el proyecto y elegir _Publicar {NOMBRE DEL PROYECTO}_ en el menú _Compilar_.


### ERROR: _The remote certificate is invalid according to the validation procedure._

En caso de tener errores de publicación relativos a dicho problema, es necesario agregar manualmente la propiedad _AllowUntrustedCertificate_ con un valor de _True_ al perfil de publicación:

``` xml
<PropertyGroup>
    ...
  <AllowUntrustedCertificate>True</AllowUntrustedCertificate>
</PropertyGroup>
```

### ERROR: _HTTP 502.5 - Process Failure (IIS)_

Si una vez publicado el servicio, al hacer una llamada, por ejemplo con [Postman](https://www.postman.com/), recibiéramos este error, añadiendo la siguiente propiedad al perfil de publicación, se solucionaría:

``` xml
<PropertyGroup>
    ...
   <PublishWithAspNetCoreTargetManifest>false</PublishWithAspNetCoreTargetManifest>
</PropertyGroup>
```

### ERROR: _HTTP 405 - Method Not Allowed (IIS)_

[https://stackoverflow.com/questions/48188895/asp-net-core-with-iis-http-verb-not-allowed](https://stackoverflow.com/questions/48188895/asp-net-core-with-iis-http-verb-not-allowed)

Básicamente es necesario añadir un fichero _web.config_ con el siguiente contenido:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <modules>
        <remove name="WebDAVModule" />
      </modules>
      <handlers>
        <remove name="aspNetCore" />
        <remove name="WebDAV" />
        <remove name="ExtensionlessUrlHandler-Integrated-4.0" />
        <remove name="OPTIONSVerbHandler" />
        <remove name="TRACEVerbHandler" />
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
    </system.webServer>
  </location>
</configuration>
```

### ERROR: _Could not connect to the remote computer_

[http://go.microsoft.com/fwlink/?LinkId=221672#ERROR_COULD_NOT_CONNECT_TO_REMOTES](http://go.microsoft.com/fwlink/?LinkId=221672#ERROR_COULD_NOT_CONNECT_TO_REMOTES)

Si las soluciones propuestas por Microsoft no son válidas, otra posible causa del error puede que esté en la restricción de direcciones IP del propio _Management Service_ del IIS, cuyo valor debe ser _Allow_ o indicar explícitamente las direcciones IP desde las cuales se realizará el despliegue.


### ERROR: _Could not verify server's certificate_

[https://docs.microsoft.com/en-us/iis/publish/troubleshooting-web-deploy/web-deploy-error-codes#ERROR_CERTIFICATE_VALIDATION_FAILED](https://docs.microsoft.com/en-us/iis/publish/troubleshooting-web-deploy/web-deploy-error-codes#ERROR_CERTIFICATE_VALIDATION_FAILED)

El error se produce porque de manera predeterminada el IIS usa el certificado auto firmado de Windows, el cual no está emitido por una entidad raíz de confianza.

#### Solución 1 (usar un certificado válido)

Debemos seguir los siguientes pasos:
1. Abrir el administrador de IIS (IIS Manager).
1. En el árbol de conexiones, seleccionar la máquina.
1. En el panel de características, abrir _Management Service_ (se encuentra en el área _Management_).
1. Paramos el servicio con el botón _Stop_.
1. En el desplegable de _SSL certificate_ seleccionamos el certificado que queremos usar.
1. Volvemos a arrancar el servicio con el botón _Start_ (aceptamos cuando nos pregunte si queremos guardar los cambios).


#### Solución 2 (usar el certificado auto firmado)

[Opción 2.1 (ASP.NET Core 3.0) "Publicación en un servidor mediante un certificado que no es de confianza"](https://docs.microsoft.com/es-es/aspnet/core/host-and-deploy/visual-studio-publish-profiles?view=aspnetcore-3.0#publish-to-a-server-using-an-untrusted-certificate)

[Opción 2.2](https://stackoverflow.com/questions/33659696/publishing-from-visual-studio-2015-allow-untrusted-certificates)


### Otros errores

[https://docs.microsoft.com/en-us/iis/publish/troubleshooting-web-deploy/troubleshooting-web-deploy-problems-with-visual-studio](https://docs.microsoft.com/en-us/iis/publish/troubleshooting-web-deploy/troubleshooting-web-deploy-problems-with-visual-studio)

---
<social-share class="social-share--footer" />