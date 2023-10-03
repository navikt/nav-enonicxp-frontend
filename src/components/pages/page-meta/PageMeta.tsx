import React from 'react';
import { PageMetaProps } from 'types/content-props/page-meta-props';

export const PageMeta = (props: PageMetaProps) => {
    return (
        <article className={'pageMetaData'}>
            <div className={'content'}>I am page meta data</div>
        </article>
    );
};
