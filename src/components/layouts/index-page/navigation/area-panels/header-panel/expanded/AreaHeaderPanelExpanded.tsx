import React from 'react';
import { AreaPageProps } from '../../../../../../../types/content-props/index-pages-props';
import { Heading } from '@navikt/ds-react';
import { AreaCardGraphics } from '../../../../../../_common/area-card/graphics/AreaCardGraphics';
import { classNames } from '../../../../../../../utils/classnames';
import { ParsedHtml } from '../../../../../../_common/parsed-html/ParsedHtml';

import style from './AreaHeaderPanelExpanded.module.scss';
import graphicsStyle from '../../../../../../_common/area-card/graphics/AreaCardGraphicsCommon.module.scss';

type Props = {
    areaContent: AreaPageProps;
};

export const AreaHeaderPanelExpanded = ({ areaContent }: Props) => {
    const { header, banner, area } = areaContent.data;

    return (
        <div className={style.panel}>
            <div className={style.headerContainer}>
                <Heading level={'2'} size={'xlarge'}>
                    {header}
                </Heading>
                {banner && (
                    <div className={style.banner}>
                        <ParsedHtml htmlProps={banner} />
                    </div>
                )}
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
