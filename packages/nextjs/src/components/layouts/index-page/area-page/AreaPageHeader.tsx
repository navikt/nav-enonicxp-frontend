import React from 'react';
import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { OmradekortGraphics } from 'components/_common/omradekort/graphics/OmradekortGraphics';
import { AreaPageProps } from 'types/content-props/index-pages-props';
import graphicsStyle from 'components/_common/omradekort/graphics/OmradekortGraphicsCommon.module.scss';
import { AreaPageHeaderBanner, Banner } from './banner/AreaPageHeaderBanner';
import style from './AreaPageHeader.module.scss';

type Props = {
    content: {
        data: Pick<AreaPageProps['data'], 'header' | 'area'> & {
            banner?: Banner;
        };
    };
};

export const AreaPageHeader = ({ content }: Props) => {
    const { header, banner, area } = content.data;

    return (
        <div className={style.panel}>
            <div className={style.headerContainer}>
                <Heading level="1" size="xlarge">
                    {header}
                </Heading>
                {banner && <AreaPageHeaderBanner banner={banner} header={header} />}
            </div>
            <div className={classNames(style.gfxContainer, graphicsStyle.expandGraphics)}>
                <OmradekortGraphics type={area} insideCard={false} />
            </div>
        </div>
    );
};
