import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../../../components/PageBase';

const prefixSegments = ['no', 'nav-og-samfunn', 'kunnskap'];

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await fetchPageProps(
        [...prefixSegments, ...(context.params?.kunnskap as string[])],
        false,
        process.env.SERVICE_SECRET
    );
};

export default PageBase;
