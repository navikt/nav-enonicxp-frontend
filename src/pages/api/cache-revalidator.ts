const origin = process.env.APP_ORIGIN;
const revalidationPeriodSecs = 1; // process.env.REVALIDATION_PERIOD

const revalidationPeriodMs = revalidationPeriodSecs * 1000;

const maxPods = 8;
const reqsPerPod = 1;
const reqsPerRevalidation = maxPods * reqsPerPod;

const { networkInterfaces } = require('os');
const nets = networkInterfaces();

const getHandler = async (req, res) => {
    const { secret } = req.headers;
    const { path } = req.query;
    const url = `${origin}${path}`;

    console.log('revalidating cache for ', url);
    console.log(JSON.stringify(nets));

    [...Array(reqsPerRevalidation)].forEach((_, index) => {
        setTimeout(() => {
            console.log('fetching');
            fetch(url);
        }, revalidationPeriodMs);
    });

    return res.status(200).send('Cache revalidating triggered');
};

export default getHandler;
