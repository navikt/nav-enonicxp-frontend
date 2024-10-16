import { NextApiHandler } from 'next';
import { fetchAndSetCacheKey } from 'utils/fetch/fetch-cache-key';
import { clearImageManifest, processImageManifest } from 'utils/fetch/fetch-images';

let ready = false;
let waiting = false;

const isReady: NextApiHandler = (req, res) => {
    if (ready) {
        return res.status(200).json({ message: 'Ok!' });
    } else {
        if (!waiting) {
            waiting = true;
            fetchAndSetCacheKey()
                .then(processImageManifest)
                .finally(() => {
                    ready = true;
                    waiting = false;
                    clearImageManifest();
                });
        }
        return res.status(503).json({ message: 'Not ready' });
    }
};

export default isReady;
