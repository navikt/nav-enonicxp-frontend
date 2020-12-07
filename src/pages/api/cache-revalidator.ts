import { objectToQueryString } from '../../utils/fetch-utils';
const { networkInterfaces, hostname } = require('os');

const origin = process.env.APP_ORIGIN;
const apiUrl = `${origin}/api/cache-revalidator`;

const revalidationPeriodSecs = 1; // process.env.REVALIDATION_PERIOD
const revalidationPeriodMs = revalidationPeriodSecs * 1000;

const nets = networkInterfaces();
const podHostname = hostname();
const podIp = nets.eth0?.[0]?.address;

const numPods = 4;
const maxHops = 200;

const getHandler = async (req, res) => {
    console.log(`Pod IP: ${podIp}`);
    console.log(`Pod hostname: ${podHostname}`);

    const { secret } = req.headers;

    if (secret !== process.env.SERVICE_SECRET) {
        // return res.status(403).send('');
    }

    const { path, ttl = maxHops, podsRevalidated } = req.query;
    const _podsRevalidated = podsRevalidated ? JSON.parse(podsRevalidated) : [];

    // If this is the first request in the chain, wait to ensure we enter a new revalidation period
    // TODO: force regeneration through other means (delete html/json-files?)
    if (ttl === maxHops) {
        await new Promise((res) =>
            setTimeout(() => res({ ok: true }), revalidationPeriodMs)
        );
    }

    if (!_podsRevalidated.includes(podHostname)) {
        _podsRevalidated.push(podHostname);
        const url = `http://localhost:3000${path}`;
        console.log(`Revalidating cache for ${path} on ${podHostname}`);
        fetch(url, { method: 'HEAD' }).catch((e) =>
            console.error(
                `Cache revalidation failed for path ${path} in pod ${podHostname} - ${e}`
            )
        );
    }

    if (_podsRevalidated.length >= numPods) {
        console.log(
            `Cache revalidation completed for ${path} on ${numPods} pods in ${
                maxHops - ttl
            } hops`
        );
        return res
            .status(204)
            .send('Cache revalidation completed successfully');
    }

    if (ttl > 0) {
        fetch(
            `${apiUrl}${objectToQueryString({
                path,
                ttl: ttl - 1,
                podsRevalidated: JSON.stringify(_podsRevalidated),
            })}`,
            {
                headers: { secret },
            }
        ).catch(console.error);
        return res.status(204).send('Cache revalidation in progress');
    }

    console.error(
        `Cache revalidation failed to complete after the allowed ${maxHops} hops. Revalidated pods: ${podsRevalidated}`
    );
    return res.status(204).send('Cache revalidation did not complete');
};

export default getHandler;
