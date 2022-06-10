import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { AreaCardPartProps } from '../../../types/component-props/parts/area-card';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { StaticImage } from 'components/_common/image/StaticImage';
import style from './AreaCardPart.module.scss';

import compass from './gfx/compass.svg';
import letterS from './gfx/letterS.svg';
import heart from './gfx/heart.svg';
import hand from './gfx/hand.svg';

export const AreaCardPart = ({ config }: AreaCardPartProps) => {
    if (!config) {
        return null;
    }

    const { link } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={(props) => (
                <LenkeBase
                    href={linkProps.url}
                    analyticsLabel={linkProps.text}
                    component="area-card"
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <LinkPanel.Title>{linkProps.text}</LinkPanel.Title>
            <div className={style.animationArea}>
                <StaticImage
                    imageData={compass}
                    className={style.compass}
                    alt=""
                />
                <StaticImage
                    imageData={letterS}
                    className={style.letterS}
                    alt=""
                />
                <div className={style.mask} />
                <StaticImage imageData={heart} className={style.heart} alt="" />
                <StaticImage imageData={hand} className={style.hand} alt="" />
            </div>
        </LinkPanel>
    );
};
