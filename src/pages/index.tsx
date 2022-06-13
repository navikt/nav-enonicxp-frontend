import { GetStaticProps } from 'next';
import { LenkeBase } from '../components/_common/lenke/LenkeBase';
import { fetchPageProps } from '../utils/fetch/fetch-page-props';
import Config from '../config';

const Test = () => {
    return (
        <div>
            <LenkeBase href={'/no/person'}>{'Gammel forside'}</LenkeBase>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
    });

    return {
        ...pageProps,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export default Test;
