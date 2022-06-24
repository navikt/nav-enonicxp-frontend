import React from 'react';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { Heading } from '@navikt/ds-react';
import { AreaCardGraphics } from '../../../../_common/area-card/graphics/AreaCardGraphics';
import { classNames } from '../../../../../utils/classnames';
import graphicsStyle from '../../../../_common/area-card/graphics/AreaCardGraphicsCommon.module.scss';
import { AreaPageHeaderBanner } from './banner/AreaPageHeaderBanner';

import style from './AreaPageHeader.module.scss';

type Props = {
    areaContent: AreaPageProps;
};

export const AreaPageHeader = ({ areaContent }: Props) => {
    const { header, banner, area } = areaContent.data;

    return (
        <div className={style.panel}>
            <div className={style.headerContainer}>
                <Heading level={'2'} size={'xlarge'}>
                    {header}
                </Heading>
                {banner && <AreaPageHeaderBanner {...banner} />}
            </div>
            <div
                className={classNames(
                    style.gfxContainer,
                    graphicsStyle.expandGraphics
                )}
            >
                <AreaCardGraphics type={area} />
            </div>
        </div>
    );
};
