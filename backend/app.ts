import express from 'express';
import fetch from 'node-fetch';
import { Fact } from 'backend/fact.model';


export const app = express();

app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.post('/cat-facts', (req, res) => {

  const fact: Fact = req.body;
  console.log(fact);

  res.status(201).json({
    message: 'Fact added successfully'
  });
});

app.get('/cat-facts', async (_req, res) => {

  console.log('/cat-facts endpoint called');
  const url = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat';
  const options = {
    method: 'GET',
  };
  const response = await fetch(url, options);
  const json = await response.json();
  res.status(200).json({
    message:'Posts Fetched Succesfully',
    fact:json
  });
});
