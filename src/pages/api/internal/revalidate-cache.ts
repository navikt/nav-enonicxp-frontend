import { networkInterfaces } from 'os';
import { fetchWithTimeout } from '../../../utils/fetch-utils';
import Config from '../../../Config';

const revalidatePeriodMs = Config.vars.revalidatePeriod * 1000;

const nets = networkInterfaces();
const podIp = nets.eth0?.[0]?.address;

const regeneratePageCache = (path: string) => {
    console.log(`Regenerating page cache for ${path}`);
    fetchWithTimeout(`http://localhost:3000${path}`, 1000, {
        method: 'HEAD',
    }).catch((e) =>
        console.error(`Regeneration for path ${path} on ${podIp} failed - ${e}`)
    );
};

const revalidateCache = async (req, res) => {
    const { path } = req.query;

    if (!path) {
        return res.status(400).send('No path specified');
    }

    setTimeout(() => regeneratePageCache(path), revalidatePeriodMs);

    return res.status(200).send(`Regenerating cache for ${path}`);
};

export default revalidateCache;
