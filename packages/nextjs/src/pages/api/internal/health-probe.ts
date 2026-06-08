import { NextApiHandler } from 'next';

const healthProbe: NextApiHandler = (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: Date.now(),
    });
};

export default healthProbe;
