const express = require('express');

const server = express();

const users = ['Cleyton', 'Maria', 'Luiz'];

server.get('/users/:index', (req, res) => { 
  const { index } = req.params;

  return res.json({message : `Exibindo o indice ${index} ` + users[index]});
})

server.listen(3000);
