//Registrar nuevos usuarios en la plataforma.

export async function registrarUnUsuario(req, res) {
    try {
        const result = await registrarUSuario(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

import { crearUsuario } from "../services/usuarios.services.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const usuario = await crearUsuario({ nombre, email, password });

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        fechaRegistro: usuario.fechaRegistro,
      },
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
