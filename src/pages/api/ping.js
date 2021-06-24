import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';

const handler = nextConnect();

handler.get(async (req, res) => {
  const session = await getSession({ req });
  let resData = { message: `Hello stranger!` };
  if (session) resData.message = `Hello ${session.user.name}!`;
  res.json(resData);
});

export default handler;
