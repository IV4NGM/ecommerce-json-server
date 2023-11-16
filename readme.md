# Mock de API con Autenticación usando JWT

Este repositorio está basado en el repositorio [json-server-jwt](https://github.com/warderer/json-server-jwt "https://github.com/warderer/json-server-jwt") de [César Guerra](https://github.com/warderer "https://github.com/warderer"). La API aquí creada ha sido utilizada para crear mi ecommerce con React: [Eagle-Market](https://github.com/IV4NGM/Eagle-Market "https://github.com/IV4NGM/Eagle-Market").

## Endpoints

Por defecto el servidor se ejecuta en: http://localhost:3000

Existen las rutas de `items` y de `users`.

### users

#### Register

`POST`
`/register`

```
{
  "first_name": "Dr.",
  "last_name": "Strange",
  "gender": "M",
  "email": "drstrange@marvel.com",
  "password": "multiverso",
  "role": "CUSTOMER"
}
```

El registro requiere que el campo `gender` sea igual a `'O'`, `'M'` o `'F'`.

Al crearse un registro, automáticamente la API creará los campos `id`, `createdAt` y `updatedAt`.
Si no se especifica un `role`, como por ejemplo `ADMIN`, entonces por defecto será `CUSTOMER`.
El correo es único, si se repite devolverá error al intentar registrar uno ya creado anteriormente.

#### Login

`POST`
`/login`

```
{
  "email": "drstrange@marvel.com",
  "password": "multiverso"
}
```

Al iniciar sesión se devolverá un JWT que contiene, entre otras cosas, el `id` y `role` del usuario en el payload.

#### getAllUsers

`GET`
`/users`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Solo un usuario de `type: "ADMIN"` puede visualizar el listado de usuarios.

#### getOneUser

`GET`
`/users/:id`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Solo un usuario de `type: "ADMIN"` puede visualizar el detalle de un usuario por id.

#### me

`GET`
`/users/me`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Devolverá la información del usuario actual de acuerdo al token proporcionado.

### items

#### createItem

`POST`
`/items`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

```
{
    "product_name": "Awesome Granite Bacon",
    "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    "price": 962,
    "category": "Kids",
    "brand": "Osinski - Prosacco",
    "sku": "e9cbfac1-301a-42c3-b94a-711a39dc7ed1",
    "image": "https://i.pinimg.com/originals/eb/83/be/eb83be580847bcdc4c8f403c8085d3c8.jpg"
}
```

Debe haberse iniciado sesión y enviar el token en la cabecera de la petición para que pueda ser creado un producto.

#### getAllItems

`GET`
`/items`
Lista todos los Items.

#### getOneItem

`GET`
`/items/:id`
Devuelve un solo item de acuerdo al id proporcionado.

#### editItem

`PUT`

`/edit/:id`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

```
{
    "product_name": "NewProductName",
    "description": "NewDescription",
    "price": 000,
    "category": "NewCategory",
    "brand": "NewBrand",
    "sku": "NewSku",
    "image": "NewImage"
}
```

El usuario deberá ser tipo `ADMIN`. Si algún parámetro no se incluye en el `body`, la información de este parámetro en el nuevo item se establece como la misma que en el item anterior. Es decir, se pueden modificar solo ciertos parámetros sin necesidad de incluirlos todos en el `body`.

#### removeItem

`DELETE`

`/remove`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

```
{
	"id" : "YourProductID"
}
```


### Historial de compras

La API incluye también métodos para almacenar y obtener el historial de compras de un usuario.

#### postOrder

`POST`

`/orders`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

```
{
	"products" : [{product1Object}, {product2Object}],
	"products_amount": 5,
	"total_price": 1250
}
```

#### getHistory

`GET`

`/orders-history`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Devuelve el historial de productos del usuario con el token dado.


## Usuarios de prueba

Por defecto la API ya viene con 2 usuarios para poder comenzar a probar inmediatamente:

### Usuario tipo "CUSTOMER"

```
{
  "email": "user@mail.com",
  "password": "user0"
}
```

### Usuario tipo "ADMIN"

```
{
  "email": "admin@mail.com",
  "password": "admin0"
}
```

## Mis datos de contacto

Para cualquier comentario puedes mandarme un correo electrónico a: [ivangm_01@hotmail.com](mailto:ivangm_01@hotmail.com "mailto:ivangm_01@hotmail.com").
