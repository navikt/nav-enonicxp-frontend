import React from 'react';
import { ParsedHtml } from '../../../../../../_common/parsed-html/ParsedHtml';
import { AreaPageProps } from '../../../../../../../types/content-props/index-pages-props';
import { getSelectableLinkProps } from '../../../../../../../utils/links-from-content';
import { FancyChevron } from '../../../../../../_common/chevron/FancyChevron';
import { LenkeBase } from '../../../../../../_common/lenke/LenkeBase';
import { classNames } from '../../../../../../../utils/classnames';

import style from './AreaPageHeaderBanner.module.scss';
import chevronStyle from '../../../../../../_common/chevron/FancyChevronCommon.module.scss';

type Props = AreaPageProps['data']['banner'];

export const AreaPageHeaderBanner = ({ html, link, color }: Props) => {
    const { url } = getSelectableLinkProps(link);

    return (
        <LenkeBase
            className={classNames(style.banner, chevronStyle.animateOnHover)}
            href={url}
            style={{ '--hover-color': color } as React.CSSProperties}
        >
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />
            </div>

            <div className={style.icon}>
                <FancyChevron color={'white'} scale={0.55} />
            </div>
        </LenkeBase>
    );
};
