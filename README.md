# Delilah Resto API

##  Descripción

Tercer y último proyecto para la carrera de Desarrollo Web Full Stack Acámica.
Es una API para un restaurant donde los usuarios se pueden registrar, loguear y hacer pedidos. Los administradores pueden crear, editar y eliminar productos, así como acceso y modificación global a los usuarios y pedidos.

##  Tecnologías y recursos utilizados

- Node.js
- Nodemon
- Express
- JWT para autenticación con Token
- BCrpyt para encriptación de password
- MySQL
- Sequelize (ORM)
- Postman para testing de Endpoints
- Swagger para la documentación de la API


## Documentación de la API

- [Documentación Delilah Restó API Swagger](https://app.swaggerhub.com/apis-docs/juansie96/DelilahRestoAPI/1.0.0)

### Requisitos para instalar el proyecto

You need to have:
- [NodeJS](https://nodejs.org/).
- [XAMPP](https://www.apachefriends.org/es/index.html).
- [MySQLWorkbench](https://dev.mysql.com/downloads/workbench/) for macOS users to handle the host of MySQL local database.

### Pasos para instalación del proyecto

Elegí una carpeta y clona el proyecto desde la consola de comandos

```
$ git clone https://github.com/juansie96/delilah-resto.git
```

Instala las dependencias

```
npm install
```

1) Empieza un MySQL Server en XAMPP.
2) Crea una instancia del servidor en MySQL Workbench.
3) Crea una nueva DB con el nombre de delilah_resto
4) Si tienes alguna contraseña propia en MySQLWorkbench no te olvides de actualizar la configuración de la conexión a la DB en el archivo (/db/database.js) para que coincidan las contraseñas
5) Sobre la DB recién creada, ejecuta el archivo SQL que se encuentra en (db/queries.sql)  


### Ejecuta la API

En el proyecto, ejecuta el siguiente comando por consola
```
npm start
```

### 🚀 Testeando la API con POSTMAN

[Postman Collection](https://documenter.getpostman.com/view/12787986/TVKBXxuW)

### Usuarios para testear API. (Admin y Normal)

#### Admin
```
username: admin
password: admin
```

#### Normal User
```
username: elonmusk
password: tesla1234
```

Además, en el archivo token.txt se encuentran 2 tokens, uno de administrador y otro de usuario normal en caso de querer acceder directamente a estos y no mediante el Endpoint de Login.


### Author

- Juan Manuel Sierra

