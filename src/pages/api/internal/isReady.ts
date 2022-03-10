import { fetchAndSetCacheKey } from '../../../utils/fetch-cache-key';

let ready = false;
let waiting = false;

const isReady = (req, res) => {
    if (ready) {
        return res.status(200).json({ message: 'Ok!' });
    } else {
        if (!waiting) {
            waiting = true;
            fetchAndSetCacheKey().then(() => {
                ready = true;
                waiting = false;
            });
        }
        return res.status(503).json({ message: 'Not ready' });
    }
};

export default isReady;
