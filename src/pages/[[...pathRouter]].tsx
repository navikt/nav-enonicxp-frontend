import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { routerQueryToEnonicPathOrId } from '../utils/paths';
import PageBase, { fetchPageBaseProps } from '../components/PageBase';
import { getTargetIfRedirect } from '../utils/redirects';

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPathOrId(
        context?.params?.pathRouter || ''
    );

    const props = await fetchPageBaseProps(enonicPath);

    const redirectTarget = getTargetIfRedirect(props.content);
    if (redirectTarget) {
        return {
            props: props,
            revalidate: 60,
            redirect: { destination: redirectTarget, permanent: false },
        };
    }

    return { props: props, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export default PageBase;
