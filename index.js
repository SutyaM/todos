"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express'); // Javascript
var express_1 = __importDefault(require("express")); // Tyscriptes import
var app = express_1.default();
var port = process.env.API_PORT || 3000;
var todoIndex = 2;
var todos = [
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
var userIndex = 2;
var users = [
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
];
var userIndexHandler = function (req, res) {
    res.json(users);
};
var userCreateHandler = function (req, res) {
    console.log(req.body);
    var user = {
        id: userIndex,
        username: req.body.username,
        email: req.body.email,
        role: 'user',
        password: req.body.password
    };
    users.push(user);
    userIndex++;
    res.status(201).json(users);
};
var userShowHandler = function (req, res) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        if (user.id === parseInt(req.params.id)) {
            return res.json(user);
        }
    }
    return res.json({});
};
var userUpdateHandler = function (req, res) {
    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        if (user.id === parseInt(req.params.id)) {
            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            return res.status(203).json(user);
        }
    }
    return res.status(200).json({});
};
var userDeleteHandler = function (req, res) {
    for (var index = 0; index < users.length; index++) {
        var user = users[index];
        if (user.id === parseInt(req.params.id)) {
            users.splice(index, 1);
            return res.sendStatus(204);
        }
    }
    return res.sendStatus(200);
};
var todoIndexHandler = function (req, res) {
    res.json(todos);
};
var todoCreateHandler = function (req, res) {
    console.log(req.body);
    var newTodo = {
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
var todoShowHandler = function (req, res) {
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        if (todo.id === parseInt(req.params.id)) {
            return res.json(todo);
        }
    }
    return res.json({});
};
/*const todoShowHandler = (req, res) => {
  id = req.params.id;
  res.json(todos[id]);
}; */
var todoUpdateHandler = function (req, res) {
    for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {
        var todo = todos_2[_i];
        if (todo.id === parseInt(req.params.id)) {
            todo.name = req.body.name ? req.body.name : todo.name;
            todo.description = req.body.description ? req.body.description : todo.description;
            todo.status = req.body.status ? req.body.status : todo.status;
            return res.status(203).json(todo);
        }
    }
    return res.status(200).json({});
};
/* const todoUpdateHandler = (req, res) => {
  console.log(todos);
  id = req.params.id;
  todos[id].name = req.body.name;
  todos[id].description = req.body.description;
  todos[id].status = req.body.status;
  res.json(todos);
} */
var todoDeleteHandler = function (req, res) {
    for (var index = 0; index < todos.length; index++) {
        var todo = todos[index];
        if (todo.id === parseInt(req.params.id)) {
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
app.use(express_1.default.json());
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
app.listen(port, function () { console.log("I'm listening on " + port); });
