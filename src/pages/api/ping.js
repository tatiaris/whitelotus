import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import { getSession } from 'next-auth/client';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });
  let resData = { message: `Hello stranger!` };
  if (session) resData.message = `Hello ${session.user.name}!`;
  res.json(resData);
});

export default handler;
