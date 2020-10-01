import { fetchWithTimeout } from '../../utils/fetchWithTimeout';

type Params = {
    secret: string;
    path: string;
};

const envSecret = 'qwer';
const appOrigin = process.env.APP_ORIGIN;

export default async (req, res) => {
    const { secret, path } = req.query as Params;

    console.log(`proxied path: ${path}`);

    if (secret !== envSecret) {
        return res.status(401).json({ message: 'Access denied' });
    }
    if (!path) {
        return res.status(400).json({ message: 'Invalid path' });
    }

    const [fileType] = path.split('.').slice(-1);

    if (fileType === 'css') {
        await fetchWithTimeout(`${appOrigin}${path}`, 2000).then((res) => {
            if (res.ok) {
                return res.text();
            }
            throw Error;
        });
        res.setHeader('Content-Type', 'text/css');
        res.status(200).send(cssRes);
        return;
    }

    console.log(`requested file type: ${fileType}`);

    const pathSegments = path.replace('/www.nav.no', '').split('/');

    const nextPrefixPath = path.split('/').slice(0, 4).join('/');
    const nextJsonPath = pathSegments.slice(9).join('/');
    console.log(`json path from admin: ${nextJsonPath}`);

    res.status(200).json({});

    // const nextUrl = `${nextSiteHostname}${
    //     pathSegments[4] === 'admin' ? `${nextPrefixPath}/${nextJsonPath}` : path
    // }`;
    // console.log(`full json url: ${nextUrl}`);
};
