import { fetchPage } from '../../utils/fetch';
import { enonicContentBasePath, enonicPathToAppPath } from '../../utils/paths';

type Params = {
    secret: string;
    branch: 'master' | 'draft';
    path: string;
};

const branchUrl = {
    master: '',
    draft: '',
};

// TODO: flytt til vault el?
const envSecret = process.env.PREVIEW_SECRET;

export default async (req, res) => {
    const { secret, branch, path } = req.query as Params;
    if (secret !== envSecret) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    if (!path) {
        return res.status(400).json({ message: 'Invalid path' });
    }

    console.log('slug:', path);
    const validSlug = path?.includes(enonicContentBasePath)
        ? path
        : path.replace(/\//g, '');
    console.log('valid slug:', validSlug);

    const content = await fetchPage(validSlug);

    if (!content._path) {
        return res.status(404).json({ message: 'Not found' });
    }

    const url = `${process.env.APP_ORIGIN}${enonicPathToAppPath(
        content._path
    )}`;
    console.log('url:', url);

    res.setPreviewData({ branchUrl: branchUrl[branch] || branchUrl.master });
    res.status(200).json({ url: url });
};
