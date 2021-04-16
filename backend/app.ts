import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
// import dotenv from 'dotenv';
import { Fact, factModel } from './models/fact.model';

export const app = express();

// const mongoURL: string  = process.env.DATABASE_URL as string;
const mongoURL: string = "mongodb+srv://<name>:<password>@cluster0.jzvzy.mongodb.net/<name-of-your-database>?retryWrites=true&w=majority";

// dotenv.config();

mongoose.connect( mongoURL, {useNewUrlParser: true})
.then(()=>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("Connection Failed");
});

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

  const fact = new factModel({
    type: req.body.type,
    text: req.body.text
  });
  fact.save();
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
    message:'Fact Fetched Succesfully',
    fact:json
  });
});

app.get('/fav-cat-facts', (_req, res, _next) => {
  factModel.find()
  .then((facts) => {
    console.log(facts);
    res.status(200).json({
      message:'Facts Fetched From Database Succesfully',
      facts: facts
    });
  })

})
