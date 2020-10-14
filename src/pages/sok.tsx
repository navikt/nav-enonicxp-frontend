import React from 'react';
import { GetStaticProps } from 'next';
import { fetchSearchResults } from '../utils/search';
import { ErrorPage } from '../components/page-components/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';
import { SearchResult } from '../types/search/search-result';
import SearchPage from '../components/search/SearchPage';

type Props = {
    results: SearchResult;
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
        <div className={'content-wrapper'} id={'maincontent'}>
            <SearchPage {...results} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const results = await fetchSearchResults();

    return { props: { results }, revalidate: 1 };
};

export default SearchBase;
