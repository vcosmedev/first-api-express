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
// Qué propiedades quiero = de qué objeto las voy obtener?
// La sintaxis de desestructuración -> Expresion de JS que permite desempacar valores 
// de arreglos o propiedades de objetos en distintas variables.

const { name: firstName, github, address: { number } } = person;



const template = `Hola soy ${firstName} y mi github es: ${github}`;

console.log(template);

console.log(`number: ${number}`);

