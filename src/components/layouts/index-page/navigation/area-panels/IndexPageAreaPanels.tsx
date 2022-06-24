import React from 'react';
import { classNames } from '../../../../../utils/classnames';
import { ContentType } from '../../../../../types/content-props/_content-common';
import style from '../IndexPageNavigation.module.scss';
import { AreaHeaderPanel } from './AreaHeaderPanel';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { IndexPageNavigationCallback } from '../../useIndexPageRouting';

type Props = {
    pageProps: IndexPageContentProps;
    areaRefs: AreaPageProps[];
    navigate: IndexPageNavigationCallback;
};

export const IndexPageAreasSection = ({
    pageProps,
    areaRefs,
    navigate,
}: Props) => {
    const { __typename } = pageProps;

    return (
        <div
            className={classNames(
                __typename === ContentType.FrontPage && style.grid
            )}
        >
            {areaRefs.map((areaContent) => {
                return (
                    <AreaHeaderPanel
                        areaContent={areaContent}
                        currentContent={pageProps}
                        navigate={navigate}
                        key={areaContent._id}
                    />
                );
            })}
        </div>
    );
};
