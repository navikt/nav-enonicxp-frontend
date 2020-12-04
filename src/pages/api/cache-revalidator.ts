const origin = process.env.APP_ORIGIN;
const revalidationPeriodSecs = 1; // process.env.REVALIDATION_PERIOD

const revalidationPeriodMs = revalidationPeriodSecs * 1000;

const maxPods = 4;
const reqsPerPod = 1;
const reqsPerRevalidation = maxPods * reqsPerPod;

const { networkInterfaces, hostname } = require('os');
const nets = networkInterfaces();
const host = hostname();

const getHandler = async (req, res) => {
    const { secret } = req.headers;
    const { path } = req.query;

    const podIp = nets.eth0?.[0]?.address;
    console.log(`Pod IP: ${podIp}`);
    console.log(`Pod hostname: ${host}`);
    console.log(`Leader pod: ${process.env.ELECTOR_PATH}`);

    const url = `${origin}${path}`;
    console.log('revalidating cache for ', url);

    [...Array(reqsPerRevalidation)].forEach((_, index) => {
        setTimeout(() => {
            fetch(url);
        }, revalidationPeriodMs);
    });

    return res.status(200).send('Cache revalidating triggered');
};

export default getHandler;
