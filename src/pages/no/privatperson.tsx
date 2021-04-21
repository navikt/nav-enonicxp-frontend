import { GetStaticProps } from 'next';
import PageBase from '../../components/PageBase';

export const getStaticProps: GetStaticProps = async () => {
    return {
        notFound: true,
    };
};

export default PageBase;
