import React, { useState } from 'react';
import { ContentType } from '../../../../types/content-props/_content-common';
import { Header } from '../../../_common/headers/Header';

import style from './IndexPageNavigation.module.scss';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../../types/content-props/index-pages-props';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { classNames } from '../../../../utils/classnames';
import { IndexPageNavigationPanels } from './navigation-panels/IndexPageNavigationPanels';

type Props = {
    pageProps: FrontPageProps | AreaPageProps;
    navigationCallback: (path: string) => void;
};

export const IndexPageNavigation = ({
    pageProps,
    navigationCallback,
}: Props) => {
    const { __typename, data } = pageProps;
    const { areasRefs } = data;

    const [header] = useState(
        __typename === ContentType.FrontPage ? data.areasHeader : ''
    );

    return (
        <div className={style.centerNavigation}>
            <div
                className={classNames(
                    style.areasPageNavigation,
                    __typename !== ContentType.AreaPage && style.hidden
                )}
            >
                <LenkeInline
                    href={'/forside-test'}
                    onClick={(e) => {
                        e.preventDefault();
                        navigationCallback('/forside-test');
                    }}
                    className={style.areasPageNavigationLink}
                >
                    {'Til forside'}
                </LenkeInline>
                {__typename === ContentType.AreaPage
                    ? areasRefs.map((ref) => (
                          <LenkeInline
                              href={ref.data.customPath || ref._path}
                              onClick={(e) => {
                                  e.preventDefault();
                                  navigationCallback(
                                      ref.data.customPath || ref._path
                                  );
                              }}
                              className={style.areasPageNavigationLink}
                              key={ref._id}
                          >
                              {ref.data.header}
                          </LenkeInline>
                      ))
                    : 'empty'}
            </div>
            <Header
                level={'2'}
                justify={'left'}
                size={'large'}
                className={classNames(
                    style.frontpageHeader,
                    __typename !== ContentType.FrontPage && style.hidden
                )}
            >
                {header}
            </Header>
            <IndexPageNavigationPanels
                type={__typename}
                areasRefs={areasRefs}
                navigationCallback={navigationCallback}
            />
        </div>
    );
};
