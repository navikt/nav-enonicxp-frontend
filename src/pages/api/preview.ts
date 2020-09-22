import { fetchPage } from '../../utils/fetch';
import { enonicContentBasePath, enonicPathToAppPath } from '../../utils/paths';

type Params = {
    secret: string;
    branch: 'master' | 'draft';
    slug: string;
};

const branchUrl = {
    master: '',
    draft: '',
};

export default async (req, res) => {
    const { secret, branch, slug } = req.query as Params;
    if (secret !== 'asdf') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('slug:', slug);
    const validSlug = slug.includes(enonicContentBasePath)
        ? slug
        : slug.replace(/\//g, '');

    const content = await fetchPage(validSlug);
    console.log('valid slug:', validSlug);

    if (!content._path) {
        return res.status(401).json({ message: 'Invalid path' });
    }

    const url = `${process.env.APP_BASE_URL}${
        process.env.APP_BASE_PATH
    }${enonicPathToAppPath(content._path)}`;
    console.log('url:', url);

    res.setPreviewData({});
    // res.redirect(url);
    res.status(200).json({ url: url });
};
