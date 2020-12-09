import { initHeartbeat } from '../../../heartbeat';

const isAlive = (req, res) => {
    initHeartbeat();
    return res.status(200).json({ message: 'Ok!' });
};

export default isAlive;
