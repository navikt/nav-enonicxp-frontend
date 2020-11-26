import { fetchWithTimeout } from 'utils/fetch-utils';

const handler = async (req, res) => {
    const sitemapUrl = `${process.env.XP_ORIGIN}/_/legacy/sitemap.xml`;
    const sitemapContent = await fetchWithTimeout(sitemapUrl, 15000)
        .then((response) => {
            if (response.ok) {
                return response.text();
            }
        })
        // Remove /_/legacy
        .then((xml) => xml.replace(/\/_\/legacy/g, ''))
        .catch((e) => console.log(`error fetching json: ${e}`));

    res.setHeader('Content-Type', 'application/xml');
    res.status(200);
    res.end(sitemapContent);
};

export default handler;
