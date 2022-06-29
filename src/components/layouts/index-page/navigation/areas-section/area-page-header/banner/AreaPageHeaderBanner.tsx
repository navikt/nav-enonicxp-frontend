import React from 'react';
import { ParsedHtml } from '../../../../../../_common/parsed-html/ParsedHtml';
import { AreaPageProps } from '../../../../../../../types/content-props/index-pages-props';
import { getSelectableLinkProps } from '../../../../../../../utils/links-from-content';
import { FancyChevron } from '../../../../../../_common/chevron/FancyChevron';
import { LenkeBase } from '../../../../../../_common/lenke/LenkeBase';
import { classNames } from '../../../../../../../utils/classnames';

import style from './AreaPageHeaderBanner.module.scss';
import chevronStyle from '../../../../../../_common/chevron/FancyChevronCommon.module.scss';

type Props = {
    banner: AreaPageProps['data']['banner'],
    header: AreaPageProps['data']['header'],
};

export const AreaPageHeaderBanner = ({ banner, header }: Props) => {
    const { link, html, color } = banner;
    const { url } = getSelectableLinkProps(link);

    return (
        <LenkeBase
            className={classNames(style.banner, chevronStyle.animateOnHover)}
            href={url}
            style={{ '--hover-color': color } as React.CSSProperties}
            component={'Områdebanner'}
            analyticsLabel={header}
            linkGroup={header}
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
