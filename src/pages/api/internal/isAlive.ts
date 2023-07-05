import { NextApiHandler } from 'next';

const isAlive: NextApiHandler = (req, res) => {
    return res.status(200).json({ message: 'Ok!' });
};

export default isAlive;
