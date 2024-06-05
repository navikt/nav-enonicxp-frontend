import React from 'react';
import { GenericPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

export const GenericPage = (props: GenericPageProps) => {
    return (
        <article className={'genericPage'}>
            <div className={'content'}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
