import { GetStaticProps } from 'next';
import Config from '../../Config';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getStaticProps: GetStaticProps = async () => {
    const secret = process.env.SERVICE_SECRET as string;
    return await fetchPageProps(
        ['no', 'privatperson'],
        false,
        secret,
        Config.vars.revalidatePeriod
    );
};

export default PageBase;
