import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { AudienceReception } from '@navikt/nav-office-reception-info';
import { classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { joinWithConjunction } from 'utils/string';
import { translator } from 'translations';
import { OfficeDetailsData } from 'types/content-props/office-details-props';

import style from './OfficePageHeader.module.scss';

type AudienceReceptionDescription = Pick<AudienceReception, 'stedsbeskrivelse'>;

type Props = {
    title: string;
    officeDetails: Pick<OfficeDetailsData, 'navn' | 'type'> & {
        brukerkontakt?: {
            publikumsmottak?: Array<AudienceReceptionDescription>;
        };
    };
};

const taglineKeys = {
    LOKAL: 'taglineOffice',
    HMS: 'taglineHMS',
    ALS: 'taglineALS',
} as const;

export const OfficePageHeader = ({ title, officeDetails }: Props) => {
    const { brukerkontakt, type } = officeDetails;
    const { language } = usePageContentProps();
    const officeTranslations = translator('office', language);

    const getSubtitle = (publikumsmottak?: Array<AudienceReceptionDescription>) => {
        if (!Array.isArray(publikumsmottak) || publikumsmottak.length < 2) {
            return '';
        }

        if (type === 'HMS') {
            return '';
        }

        if (type === 'ALS') {
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

    const taglineKey = taglineKeys[type as keyof typeof taglineKeys] ?? 'taglineUnit';
    const tagline = officeTranslations(taglineKey);

    return (
        <div className={classNames(style.officePageHeader)}>
            <div className={style.content}>
                <Heading level="1" size="xlarge" className={style.heading}>
                    {title}
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
