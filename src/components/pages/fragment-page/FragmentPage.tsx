import React from 'react';
import { FragmentPageProps } from '../../../types/content-props/fragment-page-props';
import { ComponentMapper } from '../../ComponentMapper';
import { ErrorPage } from '../error-page/ErrorPage';
import { make404Props } from '../../../utils/make-error-props';
import { FragmentUsageCheck } from './fragment-usage-check/FragmentUsageCheck';
import { BEM } from '../../../utils/classnames';

const bem = BEM('fragment-page');

export const FragmentPage = (props: FragmentPageProps) => {
    if (!props.editorView) {
        return <ErrorPage {...make404Props(props._path)} />;
    }

    return (
        <div className={bem()}>
            <FragmentUsageCheck id={props._id} />
            <div className={bem('components')}>
                <ComponentMapper
                    componentProps={props.fragment}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
