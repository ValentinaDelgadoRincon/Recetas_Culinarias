import { conectarDB, obtenerDB } from "./src/config/db.js";
import { ObjectId } from "mongodb";

async function seed() {
    await conectarDB();

    // --- Colección: Usuarios ---
    const usuarios = [
        {
            _id: new ObjectId("671f00000000000000000101"),
            nombre: "Laura",
            email: "laura@example.com",
            contrasenia: "123456",
            fechaRegistro: new Date()
        },
        {
            _id: new ObjectId("671f00000000000000000102"),
            nombre: "Carlos",
            email: "carlos@example.com",
            contrasenia: "abcdef",
            fechaRegistro: new Date()
        },
        {
            _id: new ObjectId("671f00000000000000000103"),
            nombre: "Sofia",
            email: "sofia@example.com",
            contrasenia: "qwerty",
            fechaRegistro: new Date()
        }
    ];

    await obtenerDB().collection("usuarios").deleteMany();
    await obtenerDB().collection("usuarios").insertMany(usuarios);

    // --- Colección: Ingredientes ---
    const ingredientes = [
        { _id: new ObjectId("671f00000000000000000201"), nombre: "harina" },
        { _id: new ObjectId("671f00000000000000000202"), nombre: "azúcar" },
        { _id: new ObjectId("671f00000000000000000203"), nombre: "chocolate" }
    ];

    await obtenerDB().collection("ingredientes").deleteMany();
    await obtenerDB().collection("ingredientes").insertMany(ingredientes);

    // --- Colección: Recetas ---
    const recetas = [
        {
            _id: new ObjectId("671f00000000000000000301"),
            id: 1,
            titulo: "Dona rellena de chocolate",
            descripcion: "Dona esponjosa con relleno de chocolate derretido.",
            ingredientes: [
                { _id: new ObjectId("671f00000000000000000201"), nombre: "harina" },
                { _id: new ObjectId("671f00000000000000000202"), nombre: "azúcar" },
                { _id: new ObjectId("671f00000000000000000203"), nombre: "chocolate" }
            ],
            idUsuario: new ObjectId("671f00000000000000000101"),
            usuario: "Laura"
        },
        {
            _id: new ObjectId("671f00000000000000000302"),
            id: 2,
            titulo: "Pan de vainilla",
            descripcion: "Pan artesanal con sabor a vainilla y un toque dulce.",
            ingredientes: [
                { _id: new ObjectId("671f00000000000000000201"), nombre: "harina" },
                { _id: new ObjectId("671f00000000000000000202"), nombre: "azúcar" }
            ],
            idUsuario: new ObjectId("671f00000000000000000102"),
            usuario: "Carlos"
        },
        {
            _id: new ObjectId("671f00000000000000000303"),
            id: 3,
            titulo: "Brownie clásico",
            descripcion: "Brownie húmedo con intenso sabor a chocolate.",
            ingredientes: [
                { _id: new ObjectId("671f00000000000000000201"), nombre: "harina" },
                { _id: new ObjectId("671f00000000000000000203"), nombre: "chocolate" }
            ],
            idUsuario: new ObjectId("671f00000000000000000103"),
            usuario: "Sofia"
        }
    ];

    await obtenerDB().collection("recetas").deleteMany();
    await obtenerDB().collection("recetas").insertMany(recetas);

    console.log(" Base de datos poblada correctamente con usuarios, ingredientes y recetas");
    process.exit();
}

seed();
