import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express();

//Habilitar lectura de formularios
app.use(express.urlencoded({extended: true}));

//conexion a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion a la base de datos exitosa');
} catch (error) {
    console.log(error);
    
}

//Routing
app.use('/auth', usuarioRoutes)

//Habilitar pug
app.set('view engine','pug')
app.set('views', './views')

//carpeta publica
app.use(express.static('public'))

// Configurar el puerto
const port = 3000;

app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`); 
})

