import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../../../components/PageBase';

const prefixSegments = ['no', 'nav-og-samfunn', 'kunnskap'];

export const getServerSideProps: GetServerSideProps = async (context) => {
    const segmentParams = context.params?.kunnskap || [];
    const segmentsArray =
        typeof segmentParams === 'string' ? [segmentParams] : segmentParams;

    return await fetchPageProps(
        [...prefixSegments, ...segmentsArray],
        false,
        process.env.SERVICE_SECRET
    );
};

export default PageBase;
