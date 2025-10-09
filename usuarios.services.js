import { ObjectId } from "mongodb";
import { obtenerDB } from "../config/db.js";

export async function crearUsuario(datosUsuario) {
    const db = obtenerDB();
    const collection = db.collection("usuarios");

    // Validar que los campos estén completos
    if (!datosUsuario.nombre || !datosUsuario.email || !datosUsuario.contrasenia) {
        throw new Error("Todos los campos son obligatorios: nombre, email y contraseña");
    }

    // Comprobar si el usuario ya existe
    const usuarioExistente = await collection.findOne({ email: datosUsuario.email });
    if (usuarioExistente) {
        throw new Error("El correo ya está registrado en la plataforma");
    }

    // Crear el nuevo usuario
    const nuevoUsuario = {
        nombre: datosUsuario.nombre,
        email: datosUsuario.email,
        contrasenia: datosUsuario.contrasenia,
        fechaRegistro: new Date()
    };

    // Insertar en la base de datos
    const resultado = await collection.insertOne(nuevoUsuario);

    // Retornar el usuario creado con su ID
    return { id: resultado.insertedId, ...nuevoUsuario };
}

// Listar usuarios
export async function obtenerUsuarios() {
    const db = obtenerDB();
    const collection = db.collection("usuarios");

    // Obtener todos los documentos de la colección "usuarios"
    const usuarios = await collection.find().toArray();

    return usuarios;
}



// Obtener usuario por ID
export async function obtenerUsuarioPorId(id) {
    const db = obtenerDB();
    const collection = db.collection("usuarios");

    // Validar formato del ID
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de usuario no válido");
    }

    // Buscar el usuario por su _id
    const usuario = await collection.findOne({ _id: new ObjectId(id) });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return usuario;
}


// Actualizar usuario
export async function actualizarUsuario(id, nuevosDatos) {
    const db = obtenerDB();
    const collection = db.collection("usuarios");

    // Validar formato del ID
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de usuario no válido");
    }

    // Filtrar solo campos válidos para actualización
    const camposPermitidos = ["nombre", "email", "password"];
    const datosActualizados = {};

    for (const campo of camposPermitidos) {
        if (nuevosDatos[campo]) {
            datosActualizados[campo] = nuevosDatos[campo];
        }
    }

    if (Object.keys(datosActualizados).length === 0) {
        throw new Error("No se proporcionaron campos válidos para actualizar");
    }

    // Realizar actualización
    const resultado = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: datosActualizados }
    );

    if (resultado.matchedCount === 0) {
        throw new Error("Usuario no encontrado");
    }

    return { mensaje: "Usuario actualizado correctamente", id, ...datosActualizados };
}


// Eliminar usuario y sus recetas
export async function eliminarUsuario(id) {
    const db = obtenerDB();
    const usuarios = db.collection("usuarios");
    const recetas = db.collection("recetas");

    // Validar ID
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de usuario no válido"); 
    }

    // Buscar si el usuario existe
    const usuario = await usuarios.findOne({ _id: new ObjectId(id) });
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    // Eliminar todas las recetas asociadas al usuario
    const eliminarRecetas = await recetas.deleteMany({ idUsuario: new ObjectId(id) });

    // Eliminar el usuario
    const eliminarUsuario = await usuarios.deleteOne({ _id: new ObjectId(id) });

    if (eliminarUsuario.deletedCount === 0) {
        throw new Error("No se logró eliminar el usuario");
    }

    return {
        mensaje: "Usuario y recetas asociadas eliminadas correctamente",
        usuarioEliminado: usuario,
        recetasEliminadas: eliminarRecetas.deletedCount
    };
}
