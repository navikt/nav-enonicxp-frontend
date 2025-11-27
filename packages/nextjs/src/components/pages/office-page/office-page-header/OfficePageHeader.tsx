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
    officeDetails: Pick<OfficeDetailsData, 'navn' | 'type'> & {
        brukerkontakt?: {
            publikumsmottak?: Array<AudienceReceptionDescription>;
        };
    };
};

export const OfficePageHeader = ({ officeDetails }: Props) => {
    const { navn, brukerkontakt, type } = officeDetails;
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

    let tagline = '';
    if (type === 'HMS') {
        tagline = officeTranslations('taglineHMS');
    } else if (type === 'ALS') {
        tagline = officeTranslations('taglineALS');
    } else {
        tagline = officeTranslations('taglineOffice');
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
