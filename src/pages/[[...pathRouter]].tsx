import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import Config from '../config';

const PREVIEW_FLAG: string = '-preview';

const checkIfPreview = (pathRouter: string | string[]) => {
    if (!pathRouter || pathRouter.length === 0) {
        return false;
    }

    const lastPath = Array.isArray(pathRouter)
        ? pathRouter[pathRouter.length - 1]
        : pathRouter;

    return lastPath.includes(PREVIEW_FLAG);
};

const removePreviewSuffix = (pathRouter: string | string[]) => {
    if (!pathRouter || pathRouter.length === 0) {
        return '';
    }

    if (typeof pathRouter === 'string') {
        return pathRouter.replace(PREVIEW_FLAG, '');
    }

    return pathRouter.map((path) => path.replace(PREVIEW_FLAG, ''));
};

export const getStaticProps: GetStaticProps = async (context) => {
    const isPreview = checkIfPreview(context?.params?.pathRouter);

    const routerQuery = removePreviewSuffix(context?.params?.pathRouter);

    const props = await fetchPageProps({
        routerQuery,
        isDraft: isPreview,
        secret: process.env.SERVICE_SECRET,
    });

    return {
        ...props,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;
