import { fetchWithTimeout } from '../../utils/fetch-utils';
const k8s = require('@kubernetes/client-node');

const origin = process.env.APP_ORIGIN;
const revalidationPeriodSecs = 1; // process.env.REVALIDATION_PERIOD

const revalidationPeriodMs = revalidationPeriodSecs * 1000;

const maxPods = 4;
const reqsPerPod = 1;
const reqsPerRevalidation = maxPods * reqsPerPod;

const { networkInterfaces, hostname } = require('os');
const nets = networkInterfaces();
const host = hostname();

const kc = new k8s.KubeConfig();
kc.load();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const getHandler = async (req, res) => {
    const { secret } = req.headers;
    const { path } = req.query;

    const podIp = nets.eth0?.[0]?.address;
    console.log(`Pod IP: ${podIp}`);
    console.log(`Pod hostname: ${host}`);

    const electorPath = process.env.ELECTOR_PATH;
    const leader = await fetchWithTimeout(`http://${electorPath}`, 1000)
        .then((res) => (res.ok ? res.json() : {}))
        .catch(console.error);
    console.log(`Leader: ${leader.name}`);

    const url = `${origin}${path}`;
    console.log('revalidating cache for ', url);

    k8sApi
        .listNamespacedPod(
            'q6',
            undefined,
            undefined,
            undefined,
            undefined,
            'app=nav-enonicxp-frontend'
        )
        .then((res) => console.log(res.body));

    [...Array(reqsPerRevalidation)].forEach((_, index) => {
        setTimeout(() => {
            fetch(url);
        }, revalidationPeriodMs);
    });

    return res.status(200).send('Cache revalidating triggered');
};

export default getHandler;
