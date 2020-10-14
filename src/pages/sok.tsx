import React from 'react';
import { GetStaticProps } from 'next';
import { fetchSearchResults } from '../utils/search';
import { ErrorPage } from '../components/page-components/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';
import { SearchResultProps } from '../types/search/search-result';
import SearchPage from '../components/search/SearchPage';
import Head from 'next/head';
import { HeadWithMetatags } from '../components/part-components/_common/metatags/HeadWithMetatags';

type Props = {
    results: SearchResultProps;
    // breadcrumbs: Breadcrumb[];
    // languages: Language[];
    // notifications: NotificationProps[];
};

const SearchBase = (props: Props) => {
    if (!props) {
        return <ErrorPage {...makeErrorProps('www.nav.no', 'Unknown error')} />;
    }

    const { results } = props;

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

export const getStaticProps: GetStaticProps = async (context) => {
    const results = await fetchSearchResults();

    return { props: { results }, revalidate: 1 };
};

export default SearchBase;
