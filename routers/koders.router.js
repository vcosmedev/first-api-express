// ROUTER -> Definición de router -> subconjunto del server principal que permite modularizar los routers o endpoints que se tengan.
// Enfoque de aplicación -> agruparlos semánticamente (endpoint para 'koders', otro para 'mentores', otro para 'clases').

import express from 'express';
import fs from 'fs';

const router = express.Router(); // Crear un router -> router: instancia o subinstancia del servidor -> se le pueden aplicar las mismas rutas que al server

router.get('/', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    let koders = json.koders;

    // Si se requiere regresar solo los nombres de los koders:
    // const kodersName = koders.map(koer => ({name: koder.name}))

    // 1º) Accedo a los queries params directamente en el request
    const queries = request.query; // A través del 'request.query' obtengo todos los datos que mandamos obtenre
    console.log('queries: ', queries);

    // 2º) Destructuring
    const {generation, gender} = request.query;
    console.log('generation: ', generation);

    let kodersFiltered = json.koders;
    // 3º) Validar si se obtiene el query
    // string -> true
    // undefined -> false
    if(generation){
        kodersFiltered = kodersFiltered.filter(koder => koder.generation === parseInt(generation));
    }

    if(gender){
        kodersFiltered = kodersFiltered.filter(koder => koder.gender === gender);
    }

    response.json({
        success: true,
        data: {
            koders: kodersFiltered || json.koders
        }
    });
});


// POST / Enviar información de un/una koder para crearl@
router.post('/', async (request, response) => {
    // request -> objeto que abstrae aquello que nos mandan
    
    // paquete http -> headers / body
    // leer la data del nuevo koder del body
    const newKoder = request.body;
    console.log(newKoder);

    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);

    json.koders.push(newKoder);

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8');


    response.json({
        success: true,
        message: "Koder creado"
    })
}); 


// GET
// Express permite recibir info adicional desde la ruta -> path parameters
// :id -> variable, se identifica con los dos puntos seguido del nombre de la variable
router.get('/:idKoder', async (request, response) => {
    console.log(request.params);
    // console.log('param name: ', request.params.name)
    // La info adicional que se recibe es en formato string
    // params -> accede a todos los parámeros de la ruta
    const id = parseInt(request.params.idKoder);
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile)

    const koderFound = json.koders.find(koder => koder.id === id);
    if(!koderFound) {
        response.status(404)
        response.json({
            success: false,
            message: 'Koder no encontrado'
        })
        return
    }
    response.json({
        success: true,
        data: {
            koder:koderFound
        }
    })
})


// DELETE
router.delete('/:idKoder', async (request, response) => { // Declarar endpoint
    /*
    Análisis del requerimiento:
        0. ¿De dónde se quiere eliminar el Koder? -> Archivo -> Leer el archivo fs.promise.readFile()
        1. ¿Qué Koder se quiere eliminar? Obtenemos de la URL
        2. ¿Cuál es el id del Koder a eliminar? request.params.id
        3. Buscar al Koder en la lista y eliminarlo -> .filter() .splice()
        4. Actualizar el archivo sin el Koder -> fs.promise.writeFile()
        5. Responder
    */

   const dataFile = await fs.promises.readFile('kodemia.json', 'utf8');
   const json = JSON.parse(dataFile);

   // {idKoder} -> Destructuring assingment -> 
   const { idKoder } = request.params;
   // const id = request.params.idKoder
   
   const newKoders = json.koders.filter(koder => koder.id !== parseInt(idKoder));
   json.koders = newKoders; // reemplazar con los nuevos Koders
   
   await fs.promises.writeFile('kodemia.json', JSON.stringify(json, null, 2), 'utf8');

    response.json({
        success: true,
        message: 'Koder eliminado!!'
    })
});


export default router; // Exporto router para que pueda utilizarlo en otro archivo

