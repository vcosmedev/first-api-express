// Si no se está agregando la propiedad "type": "module" en el package json, se utiliza require
// require()

// import __ from ''; modules
// add '"type": modules; to package.json archive to import from / export to

import express from 'express';

const server = express() // creando nuestro server / la instancia de express

// '/' -> ROOT PATH
server.get('/', (request, response) => {
    // response.setHeader('Content-Type', 'application/json');
    // const message = {
    //     message: 'Hola desde GET /'
    // }
    // const jsonString = JSON.stringify(message);
    // response.write('GET /');
    // response.end()

    // Express
    response.json({
        message: 'Hola desde GET /    :D'
    })

})
// GET /hola
server.get('/hola', (request, response) => {
    response.write('GET /hola');
    response.end()
})

server.post('/', (request, response) => {
    response.write('POST /');
    response.end()
})

server.patch('/', (request, response) => {
    response.write('PATCH /');
    response.end()
})


// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080')
})


