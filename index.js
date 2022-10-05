// Si no se está agregando la propiedad "type": "module" en el package json, se utiliza require
// require()

// import __ from ''; modules
// add '"type": modules; to package.json archive to import from / export to

import express from 'express';

import kodersRouter from './routers/koders.router.js'

const server = express() // creando nuestro server / la instancia de express

// MIDDLEWARE - middleware -> convertir lo que llega en body a un json
server.use(express.json())

// ROUTERS
server.use('/koders', kodersRouter);

// '/' -> ROOT PATH -> // - / - root path
server.get('/', (request, response) => {
    // response.setHeader('Content-Type', 'application/json');
    // const message = {
    //     message: 'Hola desde GET /'
    // }
    // const jsonString = JSON.stringify(message);
    // response.write('GET /');
    // response.end()

    // Express
    // Response JSON
    response.json({
        message: 'Hola desde GET /    :D'
    })

});


// GET /koders
// server.get('/', (request, response) => {
//     response.json({
//         message: 'Aquí estarán todos los koders :D'
//     })

// })

// // POST /koders
// server.post('/', (request, response) => {
//     response.json({
//         message: 'Aquí estarán todos los koders'
//     })

// })

// // PATCH /koders
// server.patch('/', (request, response) => {
//     response.json({
//         message: 'Aquí se crearán koders'
//     })

// })

// // DELETE /koders
// server.delete('/', (request, response) => {
//     response.json({
//         message: 'Aquí se eliminarán koders'
//     })

// })


// // GET /koders - regresar a todos los koders
// // filtrar por generación
// // filtrar por género (query param)
// // filtrar por cantidad (count: los 2 primeros, 3 primeros, 5 primeros) HW!!!!! <---
// server.get('/koders', async (request, response) => {
//     const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
//     const json = JSON.parse(dataFile)
//     let koders = json.koders
    
//     // Si se requiere regresar solo los nombres de los koders:
//     // const kodersName = koders.map(koer => ({name: koder.name}))

//     // 1º) Accedo a los queries params directamente en el request
//     const queries = request.query; // A través del 'request.query' obtengo todos los datos que mandamos obtenre
//     console.log('queries: ', queries);

//     // 2º) Destructuring
//     const {generation, gender} = request.query;
//     console.log('generation: ', generation);

//     let kodersFiltered = json.koders;
//     // 3º) Validar si se obtiene el query
//     // string -> true
//     // undefined -> false
//     if(generation){
//         kodersFiltered = kodersFiltered.filter(koder => koder.generation === parseInt(generation));
//     }

//     if(gender){
//         kodersFiltered = kodersFiltered.filter(koder => koder.gender === gender);
//     }

//     response.json({
//         success: true,
//         data: {
//             koders: kodersFiltered || json.koders
//         }
//     });
// });


// // POST /koders - enviar información de un/una koder para crearl@
// server.post('/koders', async (request, response) => {
    
//     // request -> objeto que abstrae aquello que nos mandan
    
//     // paquete http -> headers / body
//     // leer la data del nuevo koder del body
//     const newKoder = request.body;
//     console.log(newKoder);

//     const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
//     const json = JSON.parse(dataFile);

//     json.koders.push(newKoder);

//     await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8');


//     response.json({
//         success: true,
//         message: "Koder creado"
//     });
// });


// // GET /koders/2
// // GET /koders/3
// // GET /koders/4


// // Express permite recibir info adicional desde la ruta -> path parameters
// // :id -> variable, se identifica con los dos puntos seguido del nombre de la variable
// server.get('/koders/:idKoder', async (request, response) => {
//     console.log(request.params);
//     // console.log('param name: ', request.params.name)
//     // La info adicional que se recibe es en formato string
//     // params -> accede a todos los parámeros de la ruta
//     const id = parseInt(request.params.idKoder);
//     const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
//     const json = JSON.parse(dataFile);

//     const koderFound = json.koders.find(koder => koder.id === id);
//     if(!koderFound) {
//         response.status(404)
//         response.json({
//             success: false,
//             message: 'Koder no encontrado'
//         })
//         return
//     }
//     response.json({
//         success: true,
//         data: {
//             koder:koderFound
//         }
//     })
// })


// // DELETE /KODERS/:id
// // path parameters
// server.delete('/koders/:idKoder', async (request, response) => { // Declarar endpoint
//     /*
//     Análisis del requerimiento:
//         0. ¿De dónde se quiere eliminar el Koder? -> Archivo -> Leer el archivo fs.promise.readFile()
//         1. ¿Qué Koder se quiere eliminar? Obtenemos de la URL
//         2. ¿Cuál es el id del Koder a eliminar? request.params.id
//         3. Buscar al Koder en la lista y eliminarlo -> .filter() .splice()
//         4. Actualizar el archivo sin el Koder -> fs.promise.writeFile()
//         5. Responder
//     */

//    const dataFile = await fs.promises.readFile('kodemia.json', 'utf8');
//    const json = JSON.parse(dataFile);

//    // {idKoder} -> Destructuring assingment -> 
//    const { idKoder } = request.params;
//    // const id = request.params.idKoder
   
//    const newKoders = json.koders.filter(koder => koder.id !== parseInt(idKoder));
//    json.koders = newKoders; // reemplazar con los nuevos Koders
   
//    await fs.promises.writeFile('kodemia.json', JSON.stringify(json, null, 2), 'utf8');

//     response.json({
//         success: true,
//         message: 'Koder eliminado!!'
//     })
// });


// PATCH /koders/:id

// server.patch('/:idKoder', async (request, response) =>{

//     const patchKoder = request.body;
//     console.log(patchKoder);

//     const id = parseInt(request.params.idKoder);
//     const dataFile = await fs.promises.readFile('./kodemia.json','utf8');
//     const json = JSON.parse(dataFile);
    
//     const koderFound = json.koders.find(koder => koder.id === id);

//     koderFound.id = patchKoder.id
//     koderFound.name = patchKoder.name
//     koderFound.gender = patchKoder.gender
//     koderFound.generation = patchKoder.generation

//     await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8');

//     response.json({
//         message: 'Aquí se actualiza Koders'
//     })
// });

/* ----- */

// QUERY PARAMS - ¿QUÉ SON?
// https://kodemia.mx/koders?gender=m
// Se utiliza para filtrar información extra para el REQUEST
// Hacer que un edpoint sea más 'inteligente'
// requests.query -> acceder
    // requests.query.gender


// fetch()

// // GET /hola
// server.get('/hola', (request, response) => {
//     response.write('GET /hola');
//     response.end()
// })

// server.post('/', (request, response) => {
//     response.write('POST /');
//     response.end()
// })

// server.patch('/', (request, response) => {
//     response.write('PATCH /');
//     response.end()
// })


/*
Ejercicio: 

- Crear ruta GET a /koders 'GET /koders' -> Response json: {message: Aquí estarán todos los koders}
- POST /kodres -> Response json: {message: Aquí estarán todos los koders}
- PATCH /koders -> Response json: {message: Aquí se crearán koders}
- DELETE /koders -> Response json: {message: Aquí se eliminarán koders}

Endpoint -> punto final de la informacióin
    -> Conjunto de un método o method (GET) y una ruta o path (/koders)
    GET /koders
    POST /koders
    GET /koders/:id

    GET /mentors


    Ejercicio: Práctica integradora: fs + express

        GET /koders -> Regresar un json con una lista de koders la data de los koders vendrá archivo kodemia.json
        POST /koders

        path parameters
        GET /koders/2
        GET /koders/3
        GET /koders/4

        CRUD -------------
        GET /koders
        POST /koders
        GET /koders/:id

        DELETE /koders/:id   -> request.params.id
        PATCH /koders/:id    -> request.params.id (id del koder) | newData: request.body (nuevo dato, es recibido aquí)

        > INVESTIGAR:
        >> Routers en Express
        >> Query params

*/

// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080')
})
