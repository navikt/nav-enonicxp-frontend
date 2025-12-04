import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';

export const SituationPage = (props: SituationPageProps) => {
    return (
        <article>
            <div>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
