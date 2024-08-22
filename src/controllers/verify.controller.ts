import jwt from 'jsonwebtoken';

export const verify = async (req: any, res: any) => {
  const code: string = req.body.code;

  if (code.length !== 5)
    return res.status(400).send('Damm! Nigga something wrong!');

  const validPass = code === process.env.CODE;
  if (!validPass) return res.status(400).send('Damm! Nigga code wrong!');

  //Token
  const token = jwt.sign(
    { success: true, verified: true },
    process.env.TOKEN || '',
  );
  res.header('authorization', token).send(token);
};
