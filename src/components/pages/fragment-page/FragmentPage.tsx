import React from 'react';
import { FragmentPageProps } from 'types/content-props/fragment-page-props';
import { ComponentMapper } from '../../ComponentMapper';
import { DependenciesInfo } from 'components/_editor-only/dependencies-info/DependenciesInfo';

import style from './FragmentPage.module.scss';

export const FragmentPage = (props: FragmentPageProps) => {
    return (
        <div className={style.fragmentPage}>
            <DependenciesInfo
                contentId={props._id}
                contentLayer={props.contentLayer}
                type={props.type}
            />
            <div className={style.components}>
                <ComponentMapper
                    componentProps={props.fragment}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
