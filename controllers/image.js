const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'f3acba84c61045939a55cf8b2189f7eb'
   });

   const handleApiCall = (req, res) => {
       app.model
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => releaseEvents.status(400).json('Unable to work with API'))
   }


const handldeImagePut = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
  }

  module.export = {
      handldeImagePut: handleProfileGet
  };