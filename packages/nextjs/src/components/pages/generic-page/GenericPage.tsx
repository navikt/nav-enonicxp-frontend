import React from 'react';
import { GenericPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { classNames } from 'utils/classnames';

import style from './GenericPage.module.scss';

export const GenericPage = (props: GenericPageProps) => {
    return (
        <article className={classNames('genericPage', style.genericPage)}>
            <div className={'content'}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
