import React from 'react';
import { GetServerSideProps } from 'next';
import { fetchSearchResults } from '../utils/fetchSearchResults';
import { ErrorPage } from '../components/page-components/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';
import { SearchResultProps } from '../types/search/search-result';
import SearchPage from '../components/search/SearchPage';
import { HeadWithMetatags } from '../components/part-components/_common/metatags/HeadWithMetatags';

type Props = {
    results: SearchResultProps;
    // breadcrumbs: Breadcrumb[];
    // languages: Language[];
    // notifications: NotificationProps[];
};

const SearchBase = (props: Props) => {
    const { results } = props;

    if (!results) {
        return <ErrorPage {...makeErrorProps('www.nav.no', 'Unknown error')} />;
    }

    return (
        <>
            <HeadWithMetatags
                title={'Søk'}
                description={'Søk på nav.no'}
                canonicalUrl={'https://www.nav.no/sok'}
            />
            <div className={'content-wrapper'} id={'maincontent'}>
                <SearchPage {...results} />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const results = await fetchSearchResults(context.query).catch((err) =>
        console.log(err)
    );

    if (!results) {
        const resultsWithoutQuery = await fetchSearchResults().catch((err) =>
            console.log(err)
        );
        return { props: { results: resultsWithoutQuery } };
    }

    return { props: { results: results } };
};

export default SearchBase;
