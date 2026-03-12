# Backend Ecommerce API

Este proyecto es la entrega final del curso de Backend.  
Se trata de un servidor desarrollado con Node.js y Express que simula el funcionamiento básico de un ecommerce.

El sistema permite gestionar usuarios, productos, carritos de compra y realizar compras, además de implementar autenticación con JWT, manejo de roles y recuperación de contraseña por email.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Passport
- JWT
- Nodemailer
- Handlebars
- Socket.io

---

## Instalación del proyecto

1. Clonar el repositorio


git clone https://github.com/Emacord/BackendCursoDos.git


2. Entrar en la carpeta del proyecto


cd BackendCursoDos


3. Instalar dependencias


npm install


---

## Variables de entorno

Es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables:


PORT=8080

MONGO_URL=tu_url_de_mongodb

JWT_SECRET=jwtSecret

MAIL_USER=tu_email@gmail.com

MAIL_PASS=tu_app_password


Para el envío de correos se utiliza Gmail, por lo que es necesario generar una **App Password** en la configuración de seguridad de la cuenta de Google.

---

## Ejecutar el servidor

Para iniciar el proyecto ejecutar:


node src/app.js


El servidor se ejecutará en:


http://localhost:8080


---

## Funcionalidades principales

El backend incluye las siguientes funcionalidades:

- Registro y login de usuarios
- Autenticación con JWT
- Manejo de roles (admin / user)
- Recuperación de contraseña mediante email
- Gestión de productos
- Gestión de carritos
- Proceso de compra con generación de ticket
- Verificación de stock al momento de comprar

---

## Endpoints principales

### Sesiones

Registrar usuario


POST /api/sessions/register


Login


POST /api/sessions/login


Usuario actual


GET /api/sessions/current


---

### Recuperación de contraseña

Solicitar recuperación


POST /api/sessions/forgot-password


Restablecer contraseña


POST /api/sessions/reset-password


---

### Productos

Obtener productos


GET /api/products


Crear producto (solo admin)


POST /api/products


Actualizar producto


PUT /api/products/:pid


Eliminar producto


DELETE /api/products/:pid


---

### Carritos

Obtener carrito


GET /api/carts/:cid


Agregar producto al carrito


POST /api/carts/:cid/product/:pid


---

### Compra

Realizar compra


POST /api/carts/:cid/purchase


Este endpoint se encarga de:

- verificar el stock de los productos
- descontar el stock correspondiente
- generar un ticket de compra
- devolver los productos que no pudieron comprarse por falta de stock

---

## Arquitectura del proyecto

El proyecto está organizado siguiendo una arquitectura por capas para separar responsabilidades:


Router
Controller
Service
Repository
DAO
MongoDB


También se implementa:

- DTO para evitar enviar información sensible del usuario
- Middleware de autorización según rol
- Estrategias de Passport para autenticación
- Variables de entorno para configuración

---

## Autor

Desarrollado por:

**CORDOBA EMANUEL**

Entrega final del curso de Backend.