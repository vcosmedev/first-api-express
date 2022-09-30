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


import express from 'express';

import fs from 'fs'

const server = express() // creando nuestro server / la instancia de express

// middleware - convertir lo que llega en body a un json
server.use(express.json())

// GET /koders
server.get('/', (request, response) => {
    response.json({
        message: 'Aquí estarán todos los koders :D'
    })

})

// POST /koders
server.post('/', (request, response) => {
    response.json({
        message: 'Aquí estarán todos los koders'
    })

})

// PATCH /koders
server.patch('/', (request, response) => {
    response.json({
        message: 'Aquí se crearán koders'
    })

})

// DELETE /koders
server.delete('/', (request, response) => {
    response.json({
        message: 'Aquí se eliminarán koders'
    })

})


// GET /koders - regresar a todos los koders
server.get('/koders', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)
    const koders = json.koders
    
    // Si se requiere regresar solo los nombres de los koders:
    // const kodersName = koders.map(koer => ({name: koder.name}))

    response.json({
        success: true,
        data: {
            koders
        }
    })
})


// POST /koders - enviar información de un/una koder para crearl@
server.post('/koders', async (request, response) => {
    
    // request -> objeto que abstrae aquello que nos mandan
    
    // paquete http -> headers / body
    // leer la data del nuevo koder del body
    const newKoder = request.body
    console.log(newKoder)

    const dataFile = await fs.promises.readFile('./kodemia.json')
    const json = JSON.parse(dataFile)

    json.koders.push(newKoder)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8')


    response.json({
        success: true,
        message: "Koder creado"
    })
})


// GET /koders/2
// GET /koders/3
// GET /koders/4


// Express permite recibir info adicional desde la ruta -> path parameters
// :id -> variable, se identifica con los dos puntos seguido del nombre de la variable
server.get('/koders/:idKoder', async (request, response) => {
    console.log(request.params)
    // console.log('param name: ', request.params.name)
    // La info adicional que se recibe es en formato string
    // params -> accede a todos los parámeros de la ruta
    const id = parseInt(request.params.idKoder)
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)

    const koderFound = json.koders.find(koder => koder.id === id)
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


// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080')
})




