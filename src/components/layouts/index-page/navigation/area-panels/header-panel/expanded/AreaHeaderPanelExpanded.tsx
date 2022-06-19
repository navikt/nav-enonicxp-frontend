import React from 'react';
import { AreaPageProps } from '../../../../../../../types/content-props/index-pages-props';
import { WarningFilled } from '@navikt/ds-icons';
import { Heading } from '@navikt/ds-react';
import { ParsedHtml } from '../../../../../../_common/parsed-html/ParsedHtml';
import { classNames } from '../../../../../../../utils/classnames';

import style from './AreaHeaderPanelExpanded.module.scss';

type Props = {
    areaContent: AreaPageProps;
};

export const AreaHeaderPanelExpanded = ({ areaContent }: Props) => {
    const { header, banner } = areaContent.data;

    return (
        <div className={classNames(style.panel, banner && style.withBanner)}>
            <Heading level={'2'} size={'xlarge'} className={style.header}>
                {header}
            </Heading>
            <div className={style.iconContainer}>
                {banner && (
                    <div className={style.banner}>
                        <ParsedHtml htmlProps={banner} />
                    </div>
                )}
                <WarningFilled className={style.icon} />
            </div>
        </div>
    );
};
