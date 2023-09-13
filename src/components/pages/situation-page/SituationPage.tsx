import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

export const SituationPage = (props: SituationPageProps) => {
    return (
        <article className={'situationPage'}>
            <ThemedPageHeader contentProps={props} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </article>
    );
};
