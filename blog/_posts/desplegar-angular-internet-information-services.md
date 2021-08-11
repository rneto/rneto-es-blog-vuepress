---
date: 2021-03-06
tags:
  - Angular
  - InternetInformationServices
permalink: /blog/:slug
---

# Desplegar una aplicación Angular en Internet Information Services

<social-share class="social-share--header" />

Para la correcta ejecución de una aplicación Angular en Internet Information Services (en adelante IIS), debemos hacer una serie de ajustes mínimos tanto en el servidor web como en el proceso de despliegue, con el objetivo de que el sistema de enrutado de Angular funcione según lo esperado.

## Regla de reescritura de enrutado para IIS

Según podemos encontrar en la documentación sobre [configuración de servidores](https://angular.io/guide/deployment#server-configuration) para Angular, vamos a necesitar una regla para la reescritura del enrutado de las URL servidas por IIS hacia la página de entrada a la aplicación _index.html_ mediante la creación de un fichero de configuración propio para IIS, _web.config_.

Para la automatizar el despliegue del nuevo fichero, en primer lugar debemos añadir un nuevo fichero _web.config_ al directorio raíz de nuestra aplicación _my-app\src_ con el siguiente contenido:

``` xml
<configuration>
  <location path="index.html">
    <system.webServer>
      <httpProtocol>
        <customHeaders>
          <add name="Cache-Control" value="no-store, max-age=0" />
        </customHeaders>
      </httpProtocol>
    </system.webServer>
  </location>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="HTTP to HTTPS" enabled="true" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="^OFF$" />
          </conditions>
          <action type="Redirect" url="https://{HTTP_HOST}{REQUEST_URI}" />
        </rule>
        <rule name="Angular Routes" enabled="true" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

> CONSEJO · El fichero _web.config_ también se puede usar para añadir la configuración de la caché para el recurso _index.html_ (o cualquier otro de nuestra aplicación), así que para evitar futuros problemas con la caché de los navegadores cuando queramos desplegar nuevas versiones de nuestra aplicación, he aprovechado para añadir una sección específica que nos será de gran ayuda en el futuro.

A continuación, vamos a configurarlo en los _assets_ del proyecto en el fichero _angular.json_:

``` json
{
  ...,
  "build": {
    ...,
    "options": {
      ...,
      "assets": [
        ...,
        "src/web.config"
      ],
      ...
    },
  },
  ...
}
```
_angular.json_

Ahora, cuando compilemos nuestra aplicación, se agregará automáticamente el nuevo fichero _web.config_ a la carpeta de distribución de la aplicación _my-app\dist_.

## Compilación de la aplicación

En primer lugar, lo que debemos determinar es si vamos a alojar nuestra aplicación en el directorio raíz de nuestro sitio web (por ejemplo _http://localhost/_) o si vamos a hacer uno de un directorio virtual en el que alojarlo (por ejemplo _http://localhost/my-app/_).

En el primer escenario nuestro comando de compilación lo ejecutaremos normalmente como ```ng build --prod```, pero en el segundo debemos indicar la URL base donde se desplegará la aplicación, con lo que tendríamos que ejecutar ```ng build --base-href "/my-app/" --prod```. En cualquiera de los dos escenarios, encontraremos los ficheros finales de nuestra aplicación en la carpeta _my-app\dist_ una vez compilemos nuestra aplicación.

## Configuración de IIS

En primer lugar debemos tener instalados en la máquina:

- [IIS](https://docs.microsoft.com/en-us/iis)

- [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)

Ahora según hayamos determinado si vamos a desplegar nuestra aplicación en el directorio raíz de nuestro sistio web o en un directorio virtual, copiaremos el contenido de nuestra carpeta _my-app\dist_ en la carpeta _C:\inetpub\wwwroot_ o _c:\inetpub\wwwroot\my-app_ de nuestro servidor. A partir de ese momento ya podemos acceder a nuestra aplicación mediante _http://localhost/_ o _http://localhost/my-app/_ respectivamente.

---
<social-share class="social-share--footer" />
