import { GetServerSideProps } from 'next';
import { logger } from '@/shared/logger';
import { PageBase } from 'components/PageBase';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';

// Regular mode - server-side rendering with feature flags
export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
    });

    // Flags are only fetched server-side
    let flags = undefined;

    // getServerSideProps only runs on server, but add extra safety
    if (!('notFound' in pageProps || 'redirect' in pageProps)) {
        try {
            // Dynamically import unleash-server to prevent it from being bundled on the client
            const unleashModule = await import('utils/unleash-server');
            flags = await unleashModule.getUnleashFlags(context);
        } catch (error) {
            // If import fails (e.g., on client), just skip flags
            logger.error('Failed to load unleash flags:', error);
        }
    }

    return {
        ...pageProps,
        props: {
            ...pageProps.props,
            flags,
        },
    };
};

export default PageBase;
