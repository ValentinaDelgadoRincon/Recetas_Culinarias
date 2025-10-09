//Registrar nuevos usuarios en la plataforma

import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from "../services/usuarios.services.js";

export async function registrarUsuario(req, res) {
  try {
    const nuevoUsuario = await crearUsuario(req.body);
    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario
    }); 
  } catch (error) {
    res.status(400).json({ error: "Error al registrar el usuario" });
  }
}

// Consultar la lista de todos los usuarios registrados 

export async function obtenerTodosLosUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los usuarios" });
  }
}



// Obtener usuario por id

export async function obtenerUnUsuario(req, res) {
  try {
    const id = req.params.id;
    const usuario = await obtenerUsuarioPorId(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: "Error al obtener usuario" });
  }
}


// Actualizar los datos de un usuario

export async function actualizarUnUsuario(req, res) {
  try {
    const id = req.params.id;
    const resultado = await actualizarUsuario(id, req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Eliminar un usuario y todas sus recetas asociadas

export async function eliminarUnUsuario(req, res) {
  try {
    const id = req.params.id;
    const resultado = await eliminarUsuario(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
