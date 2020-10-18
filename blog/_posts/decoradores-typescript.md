---
date: 2020-6-24
tags:
  - typescript
  - patron-de-diseno
permalink: /:slug
---

# Decoradores en TypeScript

<social-share class="social-share--header" />

Los decoradores nos permiten alterar dinámicamente la funcionalidad o añadir nuevas responsabilidades a un objeto a nivel de clase, propiedad, método o parámetro sin por ello tener que emplear otros mecanismos como la herencia.

Actualmente es una característica experimental y se encuentra en la etapa 2 como [propuesta](https://github.com/tc39/proposal-decorators) para JavaScript por parte de [Ecma TC39](https://github.com/tc39), sin embargo ya es posible usarlo con la ayuda de [Babel](https://babeljs.io/).

## Decoradores de clase

El decorador de clase es una función que recibe la clase como parámetro y la devuelve después de hacer algo con ella.

``` ts
const logClass = (target: any) => {
  console.log('logClass -> ', target);
  return target;
}
```

La sintaxis para aplicar el decorador a la clase es la que sigue:

``` ts
@logClass
class User {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }
}
```

## Decoradores de método

El decorador de método es una función que recibe como parámetros la clase, el nombre del método y el [descriptor de la propiedad del objeto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), el cual es un conjunto de información que define un comportamiento de propiedad. Este último parámetro se puede usar para observar, modificar o reemplazar la definición del método.

``` ts
const logMethod = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  console.log(`logMethod -> ${target}.${propertyKey}.${descriptor}`);
}
```

La sintaxis para aplicar el decorador al método es la que sigue:

``` ts
class User {
  private name: string;

  public constructor(name: string) {
    this.name = name;

  }
  public getName(): string {
    return this.name;
  }

  @logMethod
  public synchronize(@logParam source: any): void {
    setTimeout(() => { console.log('User synchronized!'); }, 2000);
  }
}
```

## Decoradores de propiedades y parámetros

El decorador de propiedad es una función que recibe como parámetros la clase y el nombre de la propiedad.

El decorador de parámetro es una función que recibe como parámetros la clase, el nombre del parámetro y la posición del parámetro.

``` ts
const logProperty = (target: Object, propertyKey: string) => {
  console.log(`logProperty -> ${target}.${propertyKey}`);
}

const logParam = (target: Object, propertyKey: string, parameterIndex: number) => {
  console.log(`logParam -> ${target}.${propertyKey}.${parameterIndex}`);
}
```

La sintaxis para aplicar el decorador a la propiedad y al parámetro es la que sigue:

``` ts
class User {
  @logProperty
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public synchronize(@logParam source: any): void {
    setTimeout(() => { console.log('User synchronized!'); }, 2000);
  }
}
```

### Validación de clases con _class-validator_

Si estás buscando una librería que te facilite la validación de objetos utilizando decoradores en TypeScript, te recomiento el uso de [class-validator](https://github.com/typestack/class-validator). Es una biblioteca sencilla de usar y que resuelve este problema de manera muy efectiva. Cuenta además con el aval del framework Nest ([NestJS](https://docs.nestjs.com/)) que lo usa para dar soporte a su [validación](https://docs.nestjs.com/techniques/validation) decorativa mediante esta potente librería. Aquí un pequeño ejemplo de su uso:

``` ts
import {validate, Length, IsEmail} from 'class-validator';

export class User {
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;
}

let user = new user();
user.name = 'Rafael';
user.email = 'email@email.com';

validate(user).then(errors => {
  if (errors.length > 0) {
    console.log('User is not valid. Errors: ', errors);
  } else {
    console.log('User is valid.');
  }
});
```

---
<social-share class="social-share--footer" />