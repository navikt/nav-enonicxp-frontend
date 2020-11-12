import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { routerQueryToXpPathOrId } from '../utils/paths';
import PageBase, { fetchPageProps } from '../components/PageBase';
import { getTargetIfRedirect } from '../utils/redirects';
import { ContentType } from '../types/content-types/_schema';

export const getStaticProps: GetStaticProps = async (context) => {
    const xpPath = routerQueryToXpPathOrId(context?.params?.pathRouter || '');

    const props = await fetchPageProps(xpPath);

    if (
        props.content?.__typename === ContentType.Error &&
        props.content.errorCode === 404
    ) {
        return { notFound: true };
    }

    const redirectTarget = getTargetIfRedirect(props.content);

    return {
        props: { ...props, timestamp: Date.now() },
        revalidate: 1,
        ...(redirectTarget && {
            redirect: { destination: redirectTarget, permanent: false },
        }),
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;
