import  { Schema, model  } from 'mongoose';

const FactSchema: Schema = new Schema({
  type: {type: String, required: true},
  text: {type: String, required: true}
})

export const factModel = model('Fact', FactSchema);

export interface Fact{
  id: string;
  type: string;
  text: string;
}
