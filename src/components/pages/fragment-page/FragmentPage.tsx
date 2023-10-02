import React from 'react';
import { FragmentPageProps } from 'types/content-props/fragment-page-props';
import { ComponentMapper } from '../../ComponentMapper';

import style from './FragmentPage.module.scss';

export const FragmentPage = (props: FragmentPageProps) => {
    return (
        <div className={style.fragmentPage}>
            <div className={style.components}>
                <ComponentMapper
                    componentProps={props.fragment}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
