import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { BodyShort } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { joinWithConjunction } from '../../../../utils/string';
import {
    AudienceReception,
    OfficeDetailsData,
} from 'types/content-props/office-details-props';

import style from './OfficePageHeader.module.scss';

type Props = {
    showTimeStamp?: boolean;
    officeDetails: OfficeDetailsData;
};

export const OfficePageHeader = ({ officeDetails }: Props) => {
    const { navn, brukerkontakt } = officeDetails;
    const { language } = usePageConfig();

    const getSubtitle = (publikumsmottak: AudienceReception[]) => {
        if (!Array.isArray(publikumsmottak) || publikumsmottak.length < 2) {
            return '';
        }
        const allPlaces = publikumsmottak.map(
            (place) => place.stedsbeskrivelse
        );

        return `Lokalkontor for ${joinWithConjunction(allPlaces, language)}`;
    };

    const subTitle = getSubtitle(brukerkontakt?.publikumsmottak);

    return (
        <header className={classNames(style.officePageHeader)}>
            <div className={style.content}>
                <PageHeader justify={'left'}>{navn}</PageHeader>
                <div className={style.taglineWrapper}>
                    <BodyShort size="small" className={style.taglineLabel}>
                        {'NAV-KONTOR'}
                    </BodyShort>
                    {subTitle && (
                        <>
                            <span aria-hidden="true" className={style.divider}>
                                {'|'}
                            </span>
                            <BodyShort
                                size="small"
                                className={style.taglineLabel}
                            >
                                {subTitle}
                            </BodyShort>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
