import React from 'react';
import { AreaPageProps } from 'types/content-props/index-pages-props';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { classNames } from 'utils/classnames';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { FancyChevron } from 'components/_common/chevron/FancyChevron';

import chevronStyle from 'components/_common/chevron/FancyChevronCommon.module.scss';
import style from './AreaPageHeaderBanner.module.scss';

type Props = Pick<AreaPageProps['data'], 'banner' | 'header'>;

export const AreaPageHeaderBanner = ({ banner, header }: Props) => {
    const { link, html, color } = banner;
    const { url } = getSelectableLinkProps(link);

    return (
        <LenkeBase
            className={classNames(style.banner, chevronStyle.animateOnHover)}
            href={url}
            style={{ '--hover-color': color } as React.CSSProperties}
            analyticsComponent={'Områdebanner'}
            analyticsLabel={header}
            analyticsLinkGroup={header}
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
