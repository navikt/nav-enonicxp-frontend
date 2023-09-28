import React from 'react';
import { FragmentPageProps } from 'types/content-props/fragment-page-props';
import { ComponentMapper } from '../../ComponentMapper';
import { FragmentUsageCheck } from './fragment-usage-check/FragmentUsageCheck';

import style from './FragmentPage.module.scss';

export const FragmentPage = (props: FragmentPageProps) => {
    return (
        <div className={style.fragmentPage}>
            <FragmentUsageCheck id={props._id} locale={props.contentLayer} />
            <div className={style.components}>
                <ComponentMapper
                    componentProps={props.fragment}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
