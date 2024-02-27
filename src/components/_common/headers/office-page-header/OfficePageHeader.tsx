import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { BodyShort, Heading } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { joinWithConjunction } from '../../../../utils/string';
import { AudienceReception } from '@navikt/nav-office-reception-info';
import { OfficeDetailsData } from 'types/content-props/office-details-props';

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
        <div className={classNames(style.officePageHeader)}>
            <div className={style.content}>
                <Heading level="1" size="xlarge" className={style.heading}>
                    {navn}
                </Heading>
                <div className={style.taglineWrapper}>
                    <BodyShort size="small" className={style.taglineLabel}>
                        {'NAV-KONTOR'}
                    </BodyShort>
                    {subTitle && (
                        <>
                            <BodyShort
                                size="small"
                                className={style.branchNamesLabel}
                            >
                                {subTitle}
                            </BodyShort>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
