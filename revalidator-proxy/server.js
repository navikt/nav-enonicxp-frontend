const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3002;
const clientPort = 3000;
const clientLivenessApi = '/api/internal/isAlive';
const clientRevalidateApi = '/api/revalidate';

const livenessCheckPeriod = 5000;
const livenessTimeout = 1000;

const clientIpList = {};

const secret = process.env.SERVICE_SECRET;

const fetchWithTimeout = (url) =>
    Promise.race([
        fetch(url),
        new Promise((res) =>
            setTimeout(
                () =>
                    res({
                        ok: false,
                        status: 408,
                        statusText: 'Request Timeout',
                    }),
                livenessTimeout
            )
        ),
    ]);

const isValidIpAddress = (ip) => {
    const segments = ip.split('.').map(Number);
    return (
        segments.length === 4 &&
        segments.filter((segment) => segment >= 0 && segment <= 255).length ===
            4
    );
};

const checkLiveness = async () => {
    const deadClients = await Object.keys(clientIpList).reduce(
        async (deadList, clientIp) => {
            const isAlive = await fetchWithTimeout(
                `http://${clientIp}:${clientPort}${clientLivenessApi}`
            ).then((res) => res.ok);

            console.log(`${clientIp} is alive? `, isAlive);

            if (!isAlive) {
                return [...(await deadList), clientIp];
            }

            return deadList;
        },
        []
    );

    console.log(
        `Updating client list at ${Date.now()}. Dead clients to be removed: `,
        deadClients
    );

    deadClients.forEach((client) => delete clientIpList[client]);
};

app.get('/revalidator-proxy', (req, res) => {
    const { path } = req.query;
    if (!path) {
        res.status(400).send('No path provided');
        return;
    }

    Object.keys(clientIpList).forEach((clientIp) =>
        fetch(
            `http://${clientIp}:${clientPort}${clientRevalidateApi}?path=${path}`,
            { headers: { secret } }
        )
    );

    res.status(200).send(`Revalidating ${path}`);
});

app.get('/subscribe', (req, res) => {
    const { ip } = req.query;
    if (!ip || !isValidIpAddress(ip)) {
        res.status(400).send(`Invalid IPv4 address provided ${ip}`);
        return;
    }

    if (!clientIpList[ip]) {
        clientIpList[ip] = true;
    }

    res.status(200).send(`${ip} subscribed`);
});

app.get('/unsubscribe', (req, res) => {
    const { ip } = req.query;
    if (!ip) {
        res.status(400).send('No IP address provided');
        return;
    }

    if (clientIpList[ip]) {
        delete clientIpList[ip];
        res.status(200).send(`${ip} unsubscribed`);
    } else {
        res.status(200).send(`${ip} not found in subscribers list`);
    }
});

const server = app.listen(port, () => {
    console.log(`started revalidator proxy server at http://localhost:${port}`);
});

const livenessIntervalTimer = setInterval(checkLiveness, livenessCheckPeriod);

const shutdown = () => {
    console.log('Shutting down');
    clearInterval(livenessIntervalTimer);

    server.close(() => {
        console.log('Shutdown complete!');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
