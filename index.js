const express = require('express');
const bodyParser = require('body-parser');
const talkerUtils = require('./fs-utils');
const generateToken = require('./generateToken');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await talkerUtils.getTalkers();
  
  if (talkers) {
    return res.status(200).json(talkers);
  } 
    return res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await talkerUtils.getTalkers();

  const talker = talkers.find(({ id }) => id === Number(req.params.id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

app.post('/login', 
  validateEmail, 
  validatePassword, 
  (_req, res) => {
    const token = generateToken();

    return res.status(200).json({ token });
});

app.listen(PORT, () => {  
  console.log('Online');
});
