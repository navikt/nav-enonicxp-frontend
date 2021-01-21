import { GetServerSideProps } from 'next';
import PageBase from '../components/PageBase';

export const getServerSideProps: GetServerSideProps = async () => {
    console.log('Rendrer 404-side');
    return {
        notFound: true,
    };
};

export default PageBase;
