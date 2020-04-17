const express = require('express');
const morgan = require('morgan');
const app = express();


let todoIndex = 2;

const todos = [{
  id: 0, 
  name: "task 1", 
  description: "do task 1", 
  status: "in progress", 
  author: "anonymus"},
  {
  id: 1,
  name: "task2",
  description: "do this task too",
  status: "new",
  author: "anonymus"
}];

let userIndex = 2;

const users = [{
  id: 0,
  username: "Alpha",
  email: "alpha@email.com",
  role: "admin",
  password: "itsasecret"},
  {
  id: 1,
  username: "Bravo",
  email: "bravo@email.com",
  role: "user",
  password: "12345"
}]

const userIndexHandler = (req, res) => {  // /users GET
  res.json(users)
}

const userCreateHandler = (req, res) => {  // /users POST
  console.log(req.body);
  const newUser = {
    id: userIndex,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
  };
  users.push(newUser);
  userIndex++;
  res.status(201).json(users);
}

const userShowHandler = (req, res) => {  // /users/:id GET
  for(const user of users) {
    if(user.id === parseInt(req.params.id)) {
      return res.json(user);
    }
  }
  return res.json({});
};

const userUpdateHandler = (req, res) => {  // /users/:id PUT
  for(const user of users) {
    if(user.id === parseInt(req.params.id)) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.role = req.body.role;
      user.password = req.body.password;
      return res.status(203).json(user);
    }
  }
  return res.status(200).json({})
};

const userDeleteHandler = (req, res) => {  // /users/:id DELETE
  for(let index = 0; index < users.length; index++) {
    let user = users[index]
    if(user.id === parseInt(req.params.id)) {
      users.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  return res.sendStatus(200);
};

const todoIndexHandler = (req, res) => { // /todos GET
  res.json(todos);
};

const todoCreateHandler = (req, res) => { // /todos POST
  console.log(req.body);
  const newTodo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    author: "anonymus"
  };
  todos.push(newTodo);
  todoIndex++;
  res.status(201).json(todos);
};

const todoShowHandler = (req, res) => {  // /todos/:id GET
  for(const todo of todos) {
    if(todo.id === parseInt(req.params.id)) {
      return res.json(todo);
    }
  }
  return res.json({});
};

/*const todoShowHandler = (req, res) => {
  id = req.params.id;
  res.json(todos[id]);
}; */

const todoUpdateHandler = (req, res) => {  // /todos/ PUT
  for(const todo of todos) {
    if(todo.id === parseInt(req.params.id)) {
      todo.name = req.body.name;
      todo.description = req.body.description;
      todo.status = req.body.status;
      return res.status(203).json(todo);
    }
  }
  return res.status(200).json({})
};

/* const todoUpdateHandler = (req, res) => {
  console.log(todos);
  id = req.params.id;
  todos[id].name = req.body.name;
  todos[id].description = req.body.description;
  todos[id].status = req.body.status;
  res.json(todos);
} */

const todoDeleteHandler = (req, res) => {  // /todos/:id DELETE
  for(let index = 0; index < todos.length; index++) {
    let todo = todos[index]
    if(todo.id === parseInt(req.params.id)) {
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  return res.sendStatus(200);
};

/* const todoDeleteHandler = (req, res) => {
  console.log(todos);
  id = req.params.id;
  todos.splice(id, 1);
  res.json(todos);
} */

app.use(express.json());

app.get('/users', userIndexHandler);
app.post('/users', userCreateHandler);
app.get('/users/:id', userShowHandler);
app.put('/users/:id', userUpdateHandler);
app.delete('/users/:id', userDeleteHandler);
app.get('/todos', todoIndexHandler);
app.post('/todos', todoCreateHandler);
app.get('/todos/:id', todoShowHandler);
app.put('/todos/:id', todoUpdateHandler);
app.delete('/todos/:id', todoDeleteHandler);

app.listen(3000);