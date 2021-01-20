import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await fetchPageProps(
        context?.params?.draftRouter,
        true,
        process.env.SERVICE_SECRET,
        context
    );
};

export default PageBase;
