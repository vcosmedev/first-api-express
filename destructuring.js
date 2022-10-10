const person = {
    name: 'Víctor',
    lastName: 'Cosme',
    github: '@vcosmedev',
    address: {
        number: 14,
        colonia: 'Averroes'
    }
};

// const name = person.name
// const lastName = person.lastName
// const github = person.github

// Destructuring
// Destructuring makes it' possible to unpack values from arrays, or properties from objects, into distinct variables.
// ¿'Qué propiedades que se requieren'? = '¿De qué objeto se van a obtener dichas propiedades?'
// La sintaxis de desestructuración -> Expresión de JS que permite desempacar valores 
   // de arreglos o propiedades de objetos en distintas variables.

const { name: firstName, github, address: { number } } = person;



const template = `Hola soy ${firstName} y mi github es: ${github}`;

console.log(template);

console.log(`number: ${number}`);

