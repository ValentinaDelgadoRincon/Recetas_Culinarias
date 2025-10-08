import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_URI;
const nombre_db = process.env.DB_NAME;

const cliente = new MongoClient(uri);
let db;

export async function conectarDB() {
    try {
        await cliente.connect();
        console.log("DB conectada");
        db = cliente.db(nombre_db);
    } catch (error) {
        console.error("Error al conectar la DB:",error)
    }
}

export async function obtenerDB() {
    if(!db) throw new Error("No se ha conectado la DB");
    return db;
}