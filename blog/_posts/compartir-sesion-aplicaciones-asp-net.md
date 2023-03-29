---
date: 2020-7-6
tags:
  - ASPNET
  - SQLServer
permalink: /blog/:slug
canonicalUrl: https://rafaelneto.dev/blog/compartir-sesion-aplicaciones-asp-net/
---

# Compartir la sesión entre aplicaciones web ASP.NET

<social-share class="social-share--header" />

Estos días he estado investigando sobre cómo compartir la sesión de un usuario entre varias aplicaciones web ASP.NET. La idea era poner en marcha rápidamente una nueva aplicación web aprovechándome del sistema de autenticación y de la gestión del estado de la sesión de otra aplicación web antigua, hasta que pueda implementar una solución SSO entre ambas aplicaciones y crear un API específico para la nueva aplicación web que me permita dejar de usar el estado de la sesión del usuario.

Para ello es necesario seguir los siguientes pasos:

## Creación de cookies a nivel de dominio

Debemos asegurarnos de que las cookies son creadas al nivel de dominio. Para ello debemos indicar en el fichero _web.config_ de ambas aplicaciones la misma configuración:

``` xml
<system.web>
    <httpCookies domain=".midominio.com"/>
</system.web>
```

## Configuración de claves de cifrado

Es necesario establecer en ambas aplicaciones la misma configuración de claves mediante el nodo _machineKey_ en el fichero _web.config_:
``` xml
<system.web>
    <machineKey validationKey="[MISMA-KEY]" decryptionKey="[MISMA-DECRIPTION-KEY]" validation="AES" />
</system.web>
```

## Configuración de la autenticación y del estado de la sesión

También debemos compartir entre ambas aplicaciones la configuración relativa al sistema de autenticación y de gestión del estado de la sesión mediante sus ficheros _web.config_.

En mi caso estoy usando SQLServer para almacenar el estado de la sesión, pero estos pasos también valdrían para los demás modos de gestión del estado de la sesión:

``` xml
<system.web>
    <authentication mode="Forms">
        <forms name="AUTH-FORM-COOKIE" loginUrl="~/Default.aspx" protection="All" timeout="1440" path="/" slidingExpiration="true" cookieless="UseCookies" />
    </authentication>
    <authorization>
      <deny users="?" />
      <allow users="*" />
    </authorization>
    <sessionState cookieName="SESSION-STATE-COOKIE" mode="SQLServer" allowCustomSqlDatabase="true" sqlConnectionString="[MI-CONNECTION-STRING]" timeout="720" cookieless="false" />
</system.web>
```

## Uso del mismo identificador de aplicación para acceder al estado de la sesión

El punto final de la configuración nos lleva a reescribir el identificador que ASP.NET asigna a nuestras aplicaciones. El objetivo es hacer que ambas aplicaciones compartan el _AppId_ que las identifica y de esa manera también compartirán el espacio del almacén de estado de la sesión.

En primer lugar debemos crear una nueva entrada personalizada en el fichero _web.config_ de ambas aplicaciones:

``` xml
<appSettings>
    <add key="APPLICATION" value="MiApp" />
</<appSettings>
```

Y finalmente debemos agregar el siguente código al fichero _Global.asax_ también de ambas aplicaciones:

``` cs
using System.Reflection;
// ...

public override void Init()
{
    this.PostAuthenticateRequest += MvcApplication_PostAuthenticateRequest;
    base.Init();
    try
    {
        string appName = ConfigurationManager.AppSettings["APPLICATION"];
        if (!string.IsNullOrEmpty(appName))
        {
            foreach (string moduleName in this.Modules)
            {
                IHttpModule module = this.Modules[moduleName];
                SessionStateModule ssm = module as SessionStateModule;
                if (ssm != null)
                {
                    FieldInfo storeInfo = typeof(SessionStateModule).GetField("_store", BindingFlags.Instance | BindingFlags.NonPublic);
                    SessionStateStoreProviderBase store = (SessionStateStoreProviderBase)storeInfo.GetValue(ssm);
                    if (store == null)
                    {
                        FieldInfo runtimeInfo = typeof(HttpRuntime).GetField("_theRuntime", BindingFlags.Static | BindingFlags.NonPublic);
                        HttpRuntime theRuntime = (HttpRuntime)runtimeInfo.GetValue(null);
                        FieldInfo appNameInfo = typeof(HttpRuntime).GetField("_appDomainAppId", BindingFlags.Instance | BindingFlags.NonPublic);
                        appNameInfo.SetValue(theRuntime, appName);
                    }
                    else
                    {
                        Type storeType = store.GetType();
                        if (storeType.Name.Equals("OutOfProcSessionStateStore"))
                        {
                            FieldInfo uribaseInfo = storeType.GetField("s_uribase", BindingFlags.Static | BindingFlags.NonPublic);
                            uribaseInfo.SetValue(storeType, appName);
                        }
                    }
                }
            }
        }

    }
    catch (Exception ex)
    {
        string s = ex.Message.ToString();
    }
}

```

Esta sería su misma versión en Visual Basic .NET:

``` vb
<%@ Application Language="vb" %>
<%@ Import Namespace="System.Reflection" %>
<script runat="server">
    '...

    Public Overrides Sub Init()
        MyBase.Init()

        Try
            Dim appName As String = ConfigurationManager.AppSettings("APPLICATION")

            If Not String.IsNullOrEmpty(appName) Then

                For Each moduleName As String In Me.Modules
                    Dim [module] As IHttpModule = Me.Modules(moduleName)
                    Dim ssm As SessionStateModule = TryCast([module], SessionStateModule)

                    If ssm IsNot Nothing Then
                        Dim storeInfo As FieldInfo = GetType(SessionStateModule).GetField("_store", BindingFlags.Instance Or BindingFlags.NonPublic)
                        Dim store As SessionStateStoreProviderBase = CType(storeInfo.GetValue(ssm), SessionStateStoreProviderBase)

                        If store Is Nothing Then
                            Dim runtimeInfo As FieldInfo = GetType(HttpRuntime).GetField("_theRuntime", BindingFlags.[Static] Or BindingFlags.NonPublic)
                            Dim theRuntime As HttpRuntime = CType(runtimeInfo.GetValue(Nothing), HttpRuntime)
                            Dim appNameInfo As FieldInfo = GetType(HttpRuntime).GetField("_appDomainAppId", BindingFlags.Instance Or BindingFlags.NonPublic)
                            appNameInfo.SetValue(theRuntime, appName)
                        Else
                            Dim storeType As Type = store.[GetType]()

                            If storeType.Name.Equals("OutOfProcSessionStateStore") Then
                                Dim uribaseInfo As FieldInfo = storeType.GetField("s_uribase", BindingFlags.[Static] Or BindingFlags.NonPublic)
                                uribaseInfo.SetValue(storeType, appName)
                            End If
                        End If
                    End If
                Next
            End If

        Catch ex As Exception
            Dim s As String = ex.Message.ToString()
        End Try
    End Sub

</script>
```

Puedes encontras más información y el código de referencia del último paso en la pregunta _[Share Session between two web sites using asp.net and state server](https://stackoverflow.com/questions/3438912/share-session-between-two-web-sites-using-asp-net-and-state-server)_ de StackOverflow.

---
<social-share class="social-share--footer" />
