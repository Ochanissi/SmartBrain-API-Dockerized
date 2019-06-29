
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: true
//   }
// });

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'YOUR_DB_PASSWORD_HERE',
//     database : 'smart-brain'
//   }
// });


// const db = knex({
  //   client: 'pg',
  //   connection: {
    //     host : process.env.POSTGRES_HOST,
    //     user : process.env.POSTGRES_USER,
    //     password : process.env.POSTGRES_PASSWORD,
    //     database : process.env.POSTGRES_DB
    //   }
    // });

console.log(process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD);
    
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send('It is working!')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`);
})