import { GetServerSideProps } from 'next';
import PageBase from '../components/PageBase';
import { makeErrorProps } from '../utils/errors';

const content = makeErrorProps('/Feilside', 'Ukjent feil', 500);

export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.statusCode = 500;
    context.res.setHeader('X-Escape-5xx-Redirect', 'true');

    return {
        props: { content },
    };
};

export default PageBase;
