import { NextApiRequest, NextApiResponse } from 'next';

const cookieName = 'selvbetjening-idtoken';

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const authCookie = req.cookies[cookieName];

    res.status(200).send({ isLoggedIn: !!authCookie });
};

export default authHandler;
