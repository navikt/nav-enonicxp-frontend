import { NextApiHandler } from 'next';

const isAlive: NextApiHandler = (req, res) => {
    // Note: This endpoint is primarily handled by the Express layer for health checks.
    // This fallback is kept for backward compatibility and internal routing.
    return res.status(200).json({ message: 'Ok!' });
};

export default isAlive;
