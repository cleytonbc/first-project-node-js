const express = require('express');

const server = express();

// Express reconhecer o json no post
server.use(express.json());

// Middleware Global

server.use((req,  res, next)  =>  {
  console.time('request');
  console.log(`Metodo: ${req.method}, url ${req.url} `);

 next();

 console.timeEnd('request');
});

//Middleware Local
function checkUserNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json ( { erro: 'User name is requerid'})
  }
  return next();
}

function checkUserInArray (req, res, next ) {
  const user = users[req.params.index]

  if  (!user) {
    return res.status(400).json({error: "user does not exists"});
  }

  req.user=user;  

  return next();
}

// CRUD - Create - Read - Update - Delete

const users = ['Cleyton', 'Maria', 'Luiz', 'Fatinha'];

// Read
// Buscar  todos usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

// Buscar um usuário
server.get('/users/:index', checkUserInArray, (req, res) => { 
 // const { index } = req.params;

  return res.json({message : `Exibindo o usuário ${req.user} `});
});

// Create -request body
// Criando usuário
server.post('/users', checkUserNameExists, (req, res) =>{
  const { name } =req.body;

  users.push(name);

  return res.json(users);

});

// Update
// Editar usuário
server.put('/users/:index', checkUserInArray, checkUserNameExists, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

// Delete
// Excluir usuário
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send ();
})

server.listen(3000);
