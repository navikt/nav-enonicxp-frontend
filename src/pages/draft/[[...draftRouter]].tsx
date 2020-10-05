import React from 'react';
import { GetServerSideProps } from 'next';
import { routerQueryToEnonicPathOrId } from '../../utils/paths';
import PageBase, { fetchPageBaseProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const enonicPath = routerQueryToEnonicPathOrId(
        context?.params?.draftRouter || ''
    );

    const props = await fetchPageBaseProps(enonicPath, true);

    return { props: props };
};

export default PageBase;
