import React from 'react';
import { GetServerSideProps } from 'next';
import { routerQueryToXpPathOrId } from '../../utils/paths';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const xpPath = routerQueryToXpPathOrId(context?.params?.draftRouter || '');

    const props = await fetchPageProps(xpPath, true);

    return { props: props };
};

export default PageBase;
