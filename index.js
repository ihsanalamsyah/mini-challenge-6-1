const express = require('express');
const app = express();
const { User } = require('./models');

app.use(express.json());

app.get('/users', (req, res) => {
    User.findAll()
    .then(user => {
        res.status(200).json(user)
    })
})

app.post('/users', (req, res) => {
    User.create({
        ID: req.body.ID,
        Username: req.body.Username,
        password: req.body.password
    })
    .then(user =>{
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(422).json("Tidak bisa menambahkan data user")
    })
})

app.listen(3000);