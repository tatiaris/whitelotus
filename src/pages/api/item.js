import nextConnect from 'next-connect';
import { inventory } from './db';
import { findOneObject, insertOneObject, updateOneObject } from './helper';

const handler = nextConnect();

handler.get(async (req, res) => {
  let responseData = { success: false, message: 'Invalid GET Request' };
  if (inventory) {
    responseData = {
      success: true,
      message: 'Successful GET Request',
      content: inventory
    };
  }
  res.json(responseData);
});

handler.post(async (req, res) => {
  let responseData = { success: false, message: 'Invalid POST Request' };
  const newItemObject = req.body.newObject;
  try {
    // await insertOneObject('items', newItemObject)
    responseData = {
      success: true,
      message: 'Item successfully added to database!'
    };
  } catch (error) {
    responseData = {
      success: false,
      message: 'Item could not be added to database.'
    };
  }
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
