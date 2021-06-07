import React from 'react';
import { FragmentPageProps } from '../../../types/content-props/fragment-page-props';
import { ComponentMapper } from '../../ComponentMapper';
import { ErrorPage } from '../error-page/ErrorPage';
import { make404Props } from '../../../utils/make-error-props';
import { MacroUsageCheck } from './macro-usage-check/MacroUsageCheck';
import { BEM } from '../../../utils/classnames';
import './FragmentPage.less';

const bem = BEM('fragment-page');

export const FragmentPage = (props: FragmentPageProps) => {
    if (!props.editMode) {
        return <ErrorPage {...make404Props(props._path)} />;
    }

    return (
        <div className={bem()}>
            <div className={bem('usage-check')}>
                <MacroUsageCheck id={props._id} />
            </div>
            <div className={bem('components')}>
                <ComponentMapper
                    componentProps={props.fragment}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
