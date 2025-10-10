# 🍽️ API REST - Recetas Culinarias

## 📖 Descripción General

Esta API REST permite la **gestión completa de usuarios, recetas e ingredientes** para una plataforma de cocina. Los usuarios pueden registrarse, crear sus propias recetas, agregar ingredientes, y buscar recetas según ingredientes o autor.

El proyecto fue desarrollado con **Node.js, Express y MongoDB**, siguiendo buenas prácticas de organización modular y documentación clara.

---

## 🧠 Contexto Funcional

### 👥 Gestión de Usuarios
- Registrar nuevos usuarios.
- Consultar la lista completa de usuarios registrados.
- Ver la información detallada de un usuario.
- Actualizar los datos de un usuario.
- Eliminar un usuario y todas sus recetas asociadas.

### 🍳 Gestión de Recetas
- Registrar una nueva receta (con título y descripción).
- Listar todas las recetas disponibles.
- Consultar una receta específica con sus ingredientes.
- Editar el título o descripción de una receta.
- Eliminar una receta.
- Ver todas las recetas creadas por un usuario específico.

### 🧂 Gestión de Ingredientes
- Agregar ingredientes a una receta existente.
- Ver todos los ingredientes de una receta.
- Eliminar ingredientes.
- Buscar recetas que contengan un ingrediente específico.

---

## ⚙️ Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución de JavaScript.
- **Express.js** – Framework para la creación de servidores HTTP.
- **MongoDB** – Base de datos NoSQL para almacenamiento de datos.
- **Dotenv** – Manejo seguro de variables de entorno.

---


## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/usuario/Recetas_Culinarias.git
cd Recetas_Culinarias
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno (.env)

Ejemplo:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/recetasdb
```

### 4️⃣ Inicializar la base de datos con datos de prueba

```bash
node dataset.js
```

### 5️⃣ Iniciar el servidor

```bash
node server.js
```

---

## 🧾 Endpoints Documentados

### 👥 Usuarios

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | `/usuarios` | Registrar un nuevo usuario |
| GET | `/usuarios` | Listar todos los usuarios |
| GET | `/usuarios/:id` | Obtener detalles de un usuario |
| PUT | `/usuarios/:id` | Actualizar datos de un usuario |
| DELETE | `/usuarios/:id` | Eliminar un usuario y sus recetas |

**Ejemplo Request - POST /usuarios**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@mail.com"
}
```

**Ejemplo Response**
```json
{
  "message": "Usuario registrado con éxito",
  "usuario": {
    "id": "672abc1234",
    "nombre": "Juan Pérez",
    "email": "juan@mail.com"
  }
}
```

---

### 🍳 Recetas

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | `/recetas` | Crear una nueva receta |
| GET | `/recetas` | Listar todas las recetas |
| GET | `/recetas/:id` | Consultar una receta específica |
| PUT | `/recetas/:id` | Editar una receta |
| DELETE | `/recetas/:id` | Eliminar una receta |
| GET | `/usuarios/:id/recetas` | Listar todas las recetas de un usuario |

**Ejemplo Request - POST /recetas**
```json
{
  "usuarioId": "672abc1234",
  "titulo": "Arroz con pollo",
  "descripcion": "Un clásico de la cocina latinoamericana."
}
```

**Ejemplo Response**
```json
{
  "message": "Receta creada con éxito",
  "receta": {
    "id": "abc456789",
    "titulo": "Arroz con pollo",
    "descripcion": "Un clásico de la cocina latinoamericana.",
    "usuarioId": "672abc1234"
  }
}
```

---

### 🧂 Ingredientes

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | `/recetas/:id/ingredientes` | Agregar ingredientes a una receta |
| GET | `/recetas/:id/ingredientes` | Ver los ingredientes de una receta |
| DELETE | `/recetas/:id/ingredientes/:ingredienteId` | Eliminar un ingrediente |
| GET | `/recetas/buscar/:nombreIngrediente` | Buscar recetas que contengan un ingrediente |

**Ejemplo Request - POST /recetas/:id/ingredientes**
```json
{
  "nombre": "Pollo"
}
```

**Ejemplo Response**
```json
{
  "message": "Ingrediente agregado con éxito",
  "ingrediente": {
    "id": "abc123456",
    "nombre": "Pollo"
  }
}
```

---

## 🧰 Manejo de Errores

La API devuelve mensajes claros y estados HTTP adecuados:

| Código | Significado |
|--------|--------------|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 400 | Error en los datos enviados |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## 🎬 Video Demostrativo

📹 **Demostración completa en Insomnia:**  
👉 [Video demostración](https://drive.google.com/file/d/1evM7AOVaQneeodMQQgacUx6Q0MBIHfZc/view?usp=drivesdk)

---

## 👨‍💻 Autores

- **Valentina Delgado Rincón**  
- **Camila Florez Santos** 
  
  📧 valentinadr1403@gmail.com  
  📧 07camilaflorezsantos@gmail.com 

---

## 🏁 Estado del Proyecto

✅ **Versión estable:** v1.0  
🚀 Preparado para integración con aplicación web frontend.
