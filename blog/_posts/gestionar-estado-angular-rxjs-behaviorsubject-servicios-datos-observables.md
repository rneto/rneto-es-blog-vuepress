---
date: 2021-8-5
tags:
  - Angular
  - RxJs
permalink: /blog/:slug
---

# Gestionar el estado de una aplicación Angular usando RxJs BehaviorSubject para servicios de datos observables

<social-share class="social-share--header" />

Existen múltiples maneras de gestionar el estado de una aplicación en Angular ([Redux](https://github.com/angular-redux/platform) o [Ngrx Store](https://ngrx.io/guide/store) por ejemplo) y una solución de almacenamiento centralizada, sencilla y poco costosa es disponer de un servicio de datos inyectable y observable, basado en [RxJs](https://rxjs.dev/) [BehaviorSubject](https://rxjs.dev/api/index/class/BehaviorSubject), el cual consideraremos el gestor centralizado del estado de nuestra aplicación, por lo que podríamos inyectarlo en cualquier parte donde se necesiten los datos.

> Un **servicio de datos** es un servicio de Angular que se puede usar para proporcionar datos múltiples de manera consistente a diferentes partes de la aplicación.

_BehaviorSubject_ es un tipo especial de _[observable](https://angular.io/guide/observables)_ que permite la transmisión de múltiple de valores a muchos observadores simultáneos y donde siempre se almacena y permanece disponible el valor actual. Es por ello que cada vez que un nuevo consumidor se suscribe al dato, siempre recibirá el valor actual (esta es la principal diferencia respecto al _observable_ estándar).

## Implementación

Este ejemplo representa una servicio donde centralizaremos la información del usuario actual en nuestra aplicación.

``` js
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: BehaviorSubject<User> = new BehaviorSubject({} as User);
  public readonly currentUser: Observable<User> = this._currentUser.asObservable();

  constructor() { }

  setCurrentUser(currentUser: User): void {
    this._currentUser.next(currentUser);
  }
}
```
_user.service.ts_

``` js
export interface User {
  username: string;
}
```
_user.model.ts_

En el servicio hemos creado una propiedad privada `_currentUser` que protege la emisión de nuevos valores de nuestro estado (`_currentUser.next()`), los cuales se pueden emitir de manera exclusiva a través del método de acción `setCurrentUser` de nuestro servicio. Dicho método también podría ser usado para asegurarnos la consistencia de los datos que almacenemos o para interactuar con sistemas externos (ahí podríamos validar los datos recibidos o inclusive llamar a un API).

Y finalmente nos encontramos con la variable pública de sólo lectura y _observable_ `currentUser`, que es la única vía desde la que los datos pueden ser consultados.

A continuación ya podríamos suscribirnos al servicio para visualizar los datos:

``` js
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './user.service';

@Component({
  selector: 'hello',
  template: `
    <h1 *ngIf="username">Hello {{ username }}!</h1>
  `
})
export class HelloComponent implements OnInit, OnDestroy {
  username: string;

  private userServiceSubscription: Subscription | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.currentUser.subscribe(
      currentUser => {
        this.username = currentUser.username;
      }
    );
  }

  ngOnDestroy(): void {
    this.userServiceSubscription?.unsubscribe();
  }
}
```
_hello.component.ts_


O actualizarlos cuando fuera necesario:

``` js
import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  template: `
    <input #username type="text" placeholder="What is your name?">
    <button (click)="saveUserName(username.value)">Save</button>

    <hello></hello>
  `
})
export class AppComponent {
  constructor(private userService: UserService) {}

  saveUserName(username: string) {
    this.userService.setCurrentUser({ username: username });
  }
}
```
_app.component.ts_

He creado en StackBlitz un proyecto Angular con este [ejemplo de servicio de datos con RxJs BehaviorSubject](https://stackblitz.com/edit/angular-testing-service-data-with-rxjs-behaviorsubject) para verlo en acción.


## Uso de servicios de datos para las entradas y salidas de los componentes Angular

La forma estándar de gestionar la interacción entre los componentes de Angular propone el uso de parámetros _@Input_ para la entrada de datos y la emisión de eventos de salida con el atributo _@Output_, sin embargo, es posible que se produzca un paso excesivo de datos entre componentes anidados o que inclusive se complique la estrategia de centralización del estado de la aplicación por el flujo de eventos. Cuando esto se produzca, podemos llegar a replantearnos la estrategia de entradas y salidas de nuestros componentes y hacer uso de un servicio de datos observable para simplicar y desacoplar la comunicación entre nuestros componentes de una manera sencilla y eficaz.

---
<social-share class="social-share--footer" />