import { revalidatorProxyOrigin } from '../../heartbeat';

const getHandler = async (req, res) => {
    const { secret } = req.headers;

    if (secret !== process.env.SERVICE_SECRET) {
        // return res.status(403).send('Not allowed');
    }

    const { path } = req.query;

    const url = `http://${revalidatorProxyOrigin}/revalidator-proxy?path=${path}`;

    fetch(url, { method: 'HEAD', headers: { secret } }).catch((e) =>
        console.error(`Invalid response from revalidation proxy - ${e}`)
    );

    return res.status(204).send('Revalidating cache');
};

export default getHandler;
