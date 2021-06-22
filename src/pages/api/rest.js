import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get(async (req, res) => {
  let responseData = { success: false, message: 'Invalid GET Request' };
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
