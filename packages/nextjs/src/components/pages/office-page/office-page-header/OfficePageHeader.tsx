import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { AudienceReception } from '@navikt/nav-office-reception-info';
import { classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { joinWithConjunction } from 'utils/string';
import { translator } from 'translations';
import { OfficeDetailsData } from 'types/content-props/office-details-props';

import style from './OfficePageHeader.module.scss';

type Props = {
    officeDetails: OfficeDetailsData;
};

export const OfficePageHeader = ({ officeDetails }: Props) => {
    const { navn, brukerkontakt } = officeDetails;
    const { language } = usePageContentProps();
    const officeTranslations = translator('office', language);

    const getSubtitle = (publikumsmottak: AudienceReception[]) => {
        if (!Array.isArray(publikumsmottak) || publikumsmottak.length < 2) {
            return '';
        }

        if (officeDetails.type === 'HMS') {
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

    let tagline = '';
    if (officeDetails.type === 'HMS') {
        tagline = officeTranslations('taglineHMS');
    } else if (officeDetails.type === 'ALS') {
        tagline = officeTranslations('taglineALS');
    }

    return (
        <div className={classNames(style.officePageHeader)}>
            <div className={style.content}>
                <Heading level="1" size="xlarge" className={style.heading}>
                    {navn}
                </Heading>
                <div className={style.taglineWrapper}>
                    <BodyShort size="small" className={style.taglineLabel}>
                        {tagline}
                    </BodyShort>
                    {subTitle && (
                        <BodyShort size="small" className={style.branchNamesLabel}>
                            {subTitle}
                        </BodyShort>
                    )}
                </div>
            </div>
        </div>
    );
};
