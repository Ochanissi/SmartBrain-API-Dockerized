const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Mirel312',
    database : 'smart-brain'
  }
});

//console.log(postgres.select('*').from('users'));
db.select('*').from('users'). then(data => {
  console.log(data);
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImagePut(db))
app.post('/imageurl', image.handleApiCall)

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`);
})