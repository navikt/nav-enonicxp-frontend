const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const podIp = nets.eth0?.[0]?.address;

const getHandler = async (req, res) => {
    const { path } = req.query;

    const url = `http://localhost:3000${path}`;
    console.log(`Revalidating cache for ${path} on ${podIp}`);

    fetch(url, { method: 'HEAD' }).catch((e) =>
        console.error(
            `Cache revalidation failed for path ${path} on ${podIp} - ${e}`
        )
    );

    return res.status(204).send('Revalidating cache');
};

export default getHandler;
