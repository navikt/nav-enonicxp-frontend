import React from 'react';
import { Heading } from '@navikt/ds-react';
import { AreaPageHeaderBanner } from './banner/AreaPageHeaderBanner';
import { classNames } from '../../../../utils/classnames';
import { AreaCardGraphics } from '../../../_common/area-card/graphics/AreaCardGraphics';
import { AreaPageProps } from '../../../../types/content-props/index-pages-props';

import style from './AreaPageHeader.module.scss';
import graphicsStyle from '../../../_common/area-card/graphics/AreaCardGraphicsCommon.module.scss';

type Props = {
    content: AreaPageProps;
};

export const AreaPageHeader = ({ content }: Props) => {
    const { header, banner, area } = content.data;

    return (
        <div className={style.panel}>
            <div className={style.headerContainer}>
                <Heading level={'1'} size={'xlarge'}>
                    {header}
                </Heading>
                {banner && (
                    <AreaPageHeaderBanner banner={banner} header={header} />
                )}
            </div>
            <div
                className={classNames(
                    style.gfxContainer,
                    graphicsStyle.expandGraphics
                )}
            >
                <AreaCardGraphics type={area} insideCard={false} />
            </div>
        </div>
    );
};
