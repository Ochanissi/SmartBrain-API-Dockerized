const jwt = require('jsonwebtoken');
const redis = require('redis');

// Setup Redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return Promise.reject('Incorrect form submission');
    }
    return db.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => user[0])
            .catch(err => Promise.reject('Unable to get user'))
        } else {
          Promise.reject('Wrong credentials')
        }
      })
      .catch(err => Promise.reject('Wrong credentials'))
  }

  const getAuthTokenId = () => {
    console.log('auth ok');
  }

  const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign( jwtPayload, 'JWT_SECRET', { expiresIn: '2 days'});

  }

  const setToken = (key, value) => {
    return Promise.resolve(redisCLient.set(key, value))
  }

  const createSessions = (user) => {
    // JWT token, return user data
    const { umail, id } = user;
    const token = signToken(email);
    return setToken(token, id)
      .then(() => { 
        return { success: 'true', userId: id, token }})
      .catch(console.log)
    return { success: 'true', 'userId': id, token}
  }

  const signinAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    return authorization ? 
      getAuthTokenId() : 
      handleSignin(db, bcrypt, req, res)
        .then(data => {
          data.id && data.email ? createSessions(data) : Promise.reject(data)
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err))
  }

  module.exports = {
      signinAuthentication: signinAuthentication
  };