const getHandler = async (req, res) => {
    const { path } = req.query;

    const url = `${process.env.REVALIDATOR_PROXY_ORIGIN}/revalidator-proxy?path=${path}`;

    fetch(url, { method: 'HEAD' }).catch((e) =>
        console.error(`Invalid response from revalidation proxy - ${e}`)
    );

    return res.status(204).send('Revalidating cache');
};

export default getHandler;
