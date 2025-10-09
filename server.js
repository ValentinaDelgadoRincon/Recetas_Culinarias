//imports
import express from "express";
import 'dotenv/config'
import { conectarDB } from "./src/config/db.js";
import routercrearRecetas from "./src/routers/gestionRecetas.routes.js"


//Config
const app = express();
app.use(express.json());

//Routers
app.use("/recetas", routercrearRecetas);


app.get("/health", (req, res)=>{
    res.status(200).json({message: "Backend activo!!! "});
})


// Excecution
conectarDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})