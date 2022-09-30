/*
Ejercicio: 

- Crear ruta GET a /koders 'GET /koders' -> Response json: {message: Aquí estarán todos los koders}
- POST /kodres -> Response json: {message: Aquí estarán todos los koders}
- PATCH /koders -> Response json: {message: Aquí se crearán koders}
- DELETE /koders -> Response json: {message: Aquí se eliminarán koders}

*/

import express from 'express';

const server = express() // creando nuestro server / la instancia de express

// GET /koders
server.get('/koders', (request, response) => {
    response.json({
        message: 'Aquí estarán todos los koders :D'
    })

})

// POST /koders
server.post('/koders', (request, response) => {
    response.json({
        message: 'Aquí estarán todos los koders'
    })

})

// PATCH /koders
server.patch('/koders', (request, response) => {
    response.json({
        message: 'Aquí se crearán koders'
    })

})

// DELETE /koders
server.delete('/koders', (request, response) => {
    response.json({
        message: 'Aquí se eliminarán koders'
    })

})

// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080')
})

