const express = require('express');
const app = express();

// mengambil data dari models
const { User } = require('./models');

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
    .then(users => {
        res.render('users/index', {
            users
        })
    })
})

app.get('/users/create', (req, res) => {
    res.render('users/create')
});

// action dari form create
app.post('/users', (req, res) => {
    User.create({
        Username: req.body.username,
        Password: req.body.password
    })
    .then(users =>{
        res.send('User sudah dibuat')
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
    .then((users) => {
        res.render('users/update', { users })
    })
})

// action dari form update
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