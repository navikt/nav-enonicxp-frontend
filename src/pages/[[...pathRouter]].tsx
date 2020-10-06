import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { routerQueryToEnonicPathOrId } from '../utils/paths';
import PageBase, { fetchPageBaseProps } from '../components/PageBase';

export const getStaticProps: GetStaticProps = async (context) => {
    const enonicPath = routerQueryToEnonicPathOrId(
        context?.params?.pathRouter || ''
    );

    const props = await fetchPageBaseProps(enonicPath);

    return { props: props, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export default PageBase;
