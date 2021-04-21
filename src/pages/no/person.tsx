import { GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';
import Config from '../../config';

export const getStaticProps: GetStaticProps = async () => {
    const props = await fetchPageProps(
        ['no', 'privatperson'],
        false,
        process.env.SERVICE_SECRET
    );

    return {
        ...props,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export default PageBase;
