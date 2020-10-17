const express = require('express');

const server = express();

// Express reconhecer o json no post
server.use(express.json());

// CRUD - Create - Read - Update - Delete

const users = ['Cleyton', 'Maria', 'Luiz', 'Fatinha'];

// Read
server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => { 
  const { index } = req.params;

  return res.json({message : `Exibindo o indice ${index} ` + users[index]});
});

// Create -request body
server.post('/users', (req,res) =>{
  const { name } =req.body;

  users.push(name);

  return res.json(users);

});

// Update

server.put('/users/:index',(req,res)=>{
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

// Delete

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send ();
})

server.listen(3000);
