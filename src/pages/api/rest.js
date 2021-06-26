import nextConnect from 'next-connect';
import { inventory } from './db';

const handler = nextConnect();

handler.get(async (req, res) => {
  let responseData = { success: false, message: 'Invalid GET Request' };
  if (inventory) {
    responseData = {
      success: true,
      message: 'Successful GET Request',
      content: inventory
    }
  }
  res.json(responseData);
});

handler.put(async (req, res) => {
  let responseData = { success: false, message: 'Invalid POST Request' };
  res.json(responseData);
});

handler.put(async (req, res) => {
  let responseData = { success: false, message: 'Invalid PUT Request' };
  res.json(responseData);
});

handler.delete(async (req, res) => {
  let responseData = { success: false, message: 'Invalid DELETE Request' };
  res.json(responseData);
});

export default handler;
