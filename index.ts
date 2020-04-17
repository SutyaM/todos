// const express = require('express'); // Javascript
import express, { Request, Response } from 'express'; // Tyscriptes import
const app = express();
const port = process.env.API_PORT || 3000;

interface Todo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in progress' | 'done';
  authorId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
}

let todoIndex: number = 2;

const todos: Array<Todo> = [
  {
  id: 0, 
  name: "task 1", 
  description: "do task 1", 
  status: "in progress", 
  authorId: 0
  },
  {
  id: 1,
  name: "task2",
  description: "do task 2",
  status: "new",
  authorId: 1
  }
];

let userIndex: number = 2;

const users: Array<User> = [
  {
  id: 0,
  username: "Alpha",
  email: "alpha@email.com",
  role: "admin",
  password: "itsasecret"
  },
  {
  id: 1,
  username: "Bravo",
  email: "bravo@email.com",
  role: "user",
  password: "12345"
  }
]

const userIndexHandler = (req: Request, res: Response) => {  // /users GET
  res.json(users)
}

const userCreateHandler = (req: Request, res: Response) => {  // /users POST
  console.log(req.body);
  const user: User = {
    id: userIndex,
    username: req.body.username,
    email: req.body.email,
    role: 'user',
    password: req.body.password
  };
  users.push(user);
  userIndex++;
  res.status(201).json(users);
}

const userShowHandler = (req: Request, res: Response) => {  // /users/:id GET
  for(const user of users) {
    if(user.id === parseInt(req.params.id)) {
      return res.json(user);
    }
  }
  return res.json({});
};

const userUpdateHandler = (req: Request, res: Response) => {  // /users/:id PUT
  for(const user of users) {
    if(user.id === parseInt(req.params.id)) {
      user.username = req.body.username ? req.body.username : user.username;
      user.email = req.body.email ? req.body.email : user.email;
      return res.status(203).json(user);
    }
  }
  return res.status(200).json({})
};

const userDeleteHandler = (req: Request, res: Response) => {  // /users/:id DELETE
  for(let index = 0; index < users.length; index++) {
    let user = users[index]
    if(user.id === parseInt(req.params.id)) {
      users.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  return res.sendStatus(200);
};

const todoIndexHandler = (req: Request, res: Response) => { // /todos GET
  res.json(todos);
};

const todoCreateHandler = (req: Request, res: Response) => { // /todos POST
  console.log(req.body);
  const newTodo: Todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    authorId: req.body.authorId
  };
  todos.push(newTodo);
  todoIndex++;
  res.status(201).json(todos);
};

const todoShowHandler = (req: Request, res: Response) => {  // /todos/:id GET
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

const todoUpdateHandler = (req: Request, res: Response) => {  // /todos/ PUT
  for(const todo of todos) {
    if(todo.id === parseInt(req.params.id)) {
      todo.name = req.body.name ? req.body.name : todo.name;
      todo.description = req.body.description ? req.body.description : todo.description;
      todo.status = req.body.status ? req.body.status : todo.status;
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

const todoDeleteHandler = (req: Request, res: Response) => {  // /todos/:id DELETE
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

app.listen(port, () => {console.log(`I'm listening on ${port}`)});