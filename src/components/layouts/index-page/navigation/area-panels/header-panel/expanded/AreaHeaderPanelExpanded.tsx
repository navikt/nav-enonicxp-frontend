import React from 'react';
import { AreaPageProps } from '../../../../../../../types/content-props/index-pages-props';
import { Heading } from '@navikt/ds-react';
import { ParsedHtml } from '../../../../../../_common/parsed-html/ParsedHtml';
import { getAreaGraphicsComponent } from '../../../../../../_common/area-card/graphics/AreaCardGraphics';

import style from './AreaHeaderPanelExpanded.module.scss';

type Props = {
    areaContent: AreaPageProps;
};

export const AreaHeaderPanelExpanded = ({ areaContent }: Props) => {
    const { header, banner, area } = areaContent.data;

    const GraphicsComponent = getAreaGraphicsComponent(area);

    return (
        <div className={style.panel}>
            <div className={style.headerContainer}>
                <Heading level={'2'} size={'xlarge'} className={style.header}>
                    {header}
                </Heading>
                {banner && (
                    <div className={style.banner}>
                        <ParsedHtml htmlProps={banner} />
                    </div>
                )}
            </div>
            <div className={style.iconContainer}>
                <div className={style.icon}>
                    <GraphicsComponent />
                </div>
            </div>
        </div>
    );
};
