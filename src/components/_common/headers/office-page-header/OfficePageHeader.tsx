import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { BodyShort } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './OfficePageHeader.module.scss';
import { OfficeDetailsData } from 'types/content-props/office-details-props';

type Props = {
    showTimeStamp?: boolean;
    officeDetails: OfficeDetailsData;
};

export const OfficePageHeader = ({ officeDetails }: Props) => {
    const { navn } = officeDetails;
    const { language } = usePageConfig();

    const getSubtitle = () => {
        return 'lokalkontor';
    };

    const getDatesLabel = translator('dates', language);

    const pageTitle = navn;
    const subTitle = getSubtitle();
    return (
        <header className={classNames(style.officePageHeader)}>
            <div className={style.text}>
                <PageHeader justify={'left'}>{pageTitle}</PageHeader>
                {subTitle && (
                    <div className={style.taglineWrapper}>
                        {subTitle && (
                            <BodyShort
                                size="small"
                                className={style.taglineLabel}
                            >
                                {subTitle.toUpperCase()}
                            </BodyShort>
                        )}
                        {subTitle && (
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    'page-modified-info',
                                    style.divider
                                )}
                            >
                                {'|'}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};
