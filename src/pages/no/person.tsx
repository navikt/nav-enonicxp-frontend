import { GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';
import Config from '../../Config';

export const getStaticProps: GetStaticProps = async () => {
    const secret = process.env.SERVICE_SECRET as string;
    const props = await fetchPageProps(
        ['no', 'privatperson'],
        false,
        secret,
        '/no/person'
    );
    return {
        ...props,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export default PageBase;
