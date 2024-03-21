import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { BodyShort, Heading } from '@navikt/ds-react';
import { usePageContentProps } from 'store/pageContext';
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
    const { language } = usePageContentProps();

    const getSubtitle = (publikumsmottak: AudienceReception[]) => {
        if (!Array.isArray(publikumsmottak) || publikumsmottak.length < 2) {
            return '';
        }
        const allPlaces = publikumsmottak.reduce<string[]>((acc, place) => {
            const { stedsbeskrivelse } = place;
            if (stedsbeskrivelse) {
                acc.push(stedsbeskrivelse);
            }

            return acc;
        }, []);

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
