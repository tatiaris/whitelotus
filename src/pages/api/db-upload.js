import nextConnect from 'next-connect';
import { inventory } from './db';
import { insertOneObject } from './helper';

const handler = nextConnect();

handler.get(async (req, res) => {
  inventory.forEach(element => {
    await insertOneObject("items", element);
  });
});

export default handler;
