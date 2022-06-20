const express = require('express');
const bodyParser = require('body-parser');
const talkerUtils = require('./fs-utils');
const generateToken = require('./generateToken');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateWatchedAt = require('./validateWatchedAt');
const validateAuthorization = require('./validateAuthorization');
const validateTalk = require('./validateTalk');
const validateRate = require('./validateRate');

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

app.get('/talker/search', 
  validateAuthorization,
  async (req, res) => {
    const talkers = await talkerUtils.getTalkers();
    const { q } = req.query;
    
    if (q === undefined) (res.status(200).json(talkers)); 
    
    const filteredTalkers = talkers.filter((t) => t.name
    .includes(q));
    
    if (filteredTalkers) { 
      return res.status(200).json(filteredTalkers);
    }
    return res.status(200).json([]);
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

app.delete('/talker/:id', 
  validateAuthorization, 
  async (req, res) => {
    const { id } = req.params;
    const talkers = await talkerUtils.getTalkers();
      
    const talkersIndex = talkers.findIndex((t) => t.id === Number(id));
  
    talkers.splice(talkersIndex, 1);
  
    await talkerUtils.setTalkers(talkers);

    res.status(204).end();
  });

app.use(validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt);

app.post('/talker', 
  async (req, res) => {
    const { name, age, talk } = req.body;
    const newTalker = { id: 5, name, age, talk };
    const talkersList = await talkerUtils.getTalkers();
  
    talkersList.push(newTalker);

    await talkerUtils.setTalkers(talkersList);

    return res.status(201).json(newTalker);
});

app.put('/talker/:id', 
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await talkerUtils.getTalkers();
    const talkersIndex = talkers.findIndex((t) => t.id === Number(id));

    talkers[talkersIndex] = { ...talkers[talkersIndex], name, age, talk };

    await talkerUtils.setTalkers(talkers);

    return res.status(200).json(talkers[talkersIndex]);
  });

app.listen(PORT, () => {  
  console.log('Online');
});