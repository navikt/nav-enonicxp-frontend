import { GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';
import Config from '../../Config';

export const getStaticProps: GetStaticProps = async () => {
    const secret = process.env.SERVICE_SECRET as string;
    console.log(`service secret exists? ${!!secret}`);
    const props = await fetchPageProps(['no', 'privatperson'], false, secret);
    return {
        ...props,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export default PageBase;
