const express = require('express');
const app = express();

// mengambil data dari models
const { User } = require('./models');

app.use(express.json());
app.set('view engine', 'ejs');

// dipakai untuk dapat membaca dari form
app.use(
    express.urlencoded({
        extended: false
    })
);

// read data user
app.get('/users', (req, res) => {
    User.findAll()
    .then(user => {
        res.status(200).json(user)
    })
})

// create data user
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

app.get('/users/delete/:id', (req, res) => {
    User.destroy( { where: { id: req.params.id }})
    .then(() => {
        res.send(`Data user dengan id ${req.params.id} berhasil di hapus`)
    })
})

// buat API untuk mengerah ke endpoint /users/update/:id
app.get('/users/update/:id', (req, res) => {
    User.findOne( { where: { id: req.params.id }})
    .then((user) => {
        res.render('/users/update', { user })
    })
})

app.post('/users/update/:id', (req, res) => {
    User.update({
        username: req.body.username,
        password: req.body.password
    },
    {
        where: { id: req.params.id }
    })
    .then(() => {
        res.send('User berhasil di ubah')
    })
})

app.listen(3000);

// associate: cara mengambil data sama kyk join di mysql