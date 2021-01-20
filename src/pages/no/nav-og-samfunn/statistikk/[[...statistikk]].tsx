import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../../../components/PageBase';

const prefixSegments = ['no', 'nav-og-samfunn', 'statistikk'];

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await fetchPageProps(
        [...prefixSegments, ...(context.params?.statistikk as string[])],
        false,
        process.env.SERVICE_SECRET,
        context
    );
};

export default PageBase;
