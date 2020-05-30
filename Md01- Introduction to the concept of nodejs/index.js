const express = require('express');

const server = express();

server.use(express.json())

// Possuimos 3 tipos de parametros, são eles:
// Query params = ?teste=1
// Routes params = /users/1
// Request body = { "name": "Bruno", "email": "bruno@kronaMesin.com.br" }

// CRUD - Create, Read, Update, Delete

//localhost:3000/teste
// server.get('/teste', (req, res) => {
//    return res.json({ message: 'Hello Word'});
// })

// test 1 Consumindo o Query params
// server.get('/teste', (req, res) => {
//     let nome = req.query.nome;

//     return res.json({ message:  `Hello ${nome}` });
// })

//test 2 consumindo o Routes params
// const users = [ 'Bruno Luiz', 'Claudio', 'Victor'];

// server.get('/users', (req, res) => {
//     return res.json(users);
// })

// server.get('/users/:index', (req, res) => {
//     const { index } = req.params;

//     return res.json(users[index]);
// })

// server.post('/users', (req, res) => {
//     const { name } = req.body;

//     users.push(name)

//     return res.json(users);
// })

// server.put('/users/:index', (req, res) =>{
//     const { index } = req.params;
//     const { name } = req.body;

//     users[index] = name;

//     return res.json(users);
// })

// server.delete('/users/:index', (req, res) =>{
//     const { index } = req.params;

//     users.splice(index, 1);

//     return res.send();
// })


/// Middlewares // Middlewares // Middlewares

// Middlewares Global 
const users = ['Bruno Luiz', 'Claudio', 'Victor'];

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url} `)

    next();

    console.timeEnd('Request');
})

//// Middlewares local é aplicado direto nas rotas 

function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required' })
    }
    return next();
}
function checkUserArray(req, res, next){
    const user = users[req.params.index];

    if(!user){
        return res.status(400).json({ error: 'User does not exists' })
    }
    req.user = user;
    return next();
}

server.get('/users', (req, res) => {
    return res.json(users);
})

server.get('/users/:index',checkUserArray, (req, res) => {

    return res.json(req.user);
})

server.post('/users',checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name)

    return res.json(users);
})

server.put('/users/:index',checkUserExists,checkUserArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

server.delete('/users/:index',checkUserArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
})

server.listen(3000);