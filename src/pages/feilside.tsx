import { GetServerSideProps } from 'next';
import PageBase from '../components/PageBase';

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        notFound: true,
    };
};

export default PageBase;
