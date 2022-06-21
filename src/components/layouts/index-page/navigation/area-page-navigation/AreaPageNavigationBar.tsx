import React from 'react';
import { classNames } from '../../../../../utils/classnames';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { getPublicPathname } from '../../../../../utils/urls';
import { IndexPageLink } from '../link/IndexPageLink';

import style from './AreaPageNavigationBar.module.scss';

type Props = {
    isVisible: boolean;
    areasRefs: AreaPageProps[];
};

export const AreaPageNavigationBar = ({ isVisible, areasRefs }: Props) => {
    return (
        <div
            className={classNames(
                style.areasPageNavigation,
                !isVisible && style.hidden
            )}
        >
            {areasRefs.map((areaContent) => {
                const path = getPublicPathname(areaContent);

                return (
                    <IndexPageLink
                        href={path}
                        className={style.areasPageNavigationLink}
                        key={areaContent._id}
                    >
                        {areaContent.data.header}
                    </IndexPageLink>
                );
            })}
        </div>
    );
};
