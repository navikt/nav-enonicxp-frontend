import { startHeartbeat } from '../../../heartbeat';

const isAlive = (req, res) => {
    startHeartbeat();
    return res.status(200).json({ message: 'Ok!' });
};

export default isAlive;
