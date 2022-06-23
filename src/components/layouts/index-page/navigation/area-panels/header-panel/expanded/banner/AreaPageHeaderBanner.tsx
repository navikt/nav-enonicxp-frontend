import React from 'react';

import style from './AreaPageHeaderBanner.module.scss';
import { ParsedHtml } from '../../../../../../../_common/parsed-html/ParsedHtml';
import { AreaPageProps } from '../../../../../../../../types/content-props/index-pages-props';
import { getSelectableLinkProps } from '../../../../../../../../utils/links-from-content';
import { RightFilled } from '@navikt/ds-icons';

type Props = AreaPageProps['data']['banner'];

export const AreaPageHeaderBanner = ({ html, link, color }: Props) => {
    const { url } = getSelectableLinkProps(link);

    return (
        <a
            className={style.banner}
            href={url}
            style={{ '--hover-color': color } as React.CSSProperties}
        >
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />
            </div>

            <RightFilled className={style.icon} />
        </a>
    );
};
