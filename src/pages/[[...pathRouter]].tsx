import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { routerQueryToXpPathOrId } from '../utils/paths';
import PageBase, { fetchPageBaseProps } from '../components/PageBase';
import { getTargetIfRedirect } from '../utils/redirects';

export const getStaticProps: GetStaticProps = async (context) => {
    const xpPath = routerQueryToXpPathOrId(context?.params?.pathRouter || '');

    const props = await fetchPageBaseProps(xpPath);

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
        fallback: true,
    };
};

export default PageBase;
