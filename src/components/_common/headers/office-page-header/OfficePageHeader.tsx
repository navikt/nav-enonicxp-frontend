import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { BodyShort } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
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
        if (
            !publikumsmottak ||
            !publikumsmottak.length ||
            publikumsmottak.length < 2
        ) {
            return '';
        }
        const num = publikumsmottak.length;
        let title = 'Lokalkontor for ';
        for (let i = 0; i < num; i++) {
            if (i > 0) {
                if (i === num - 1) {
                    title += ' og ';
                } else {
                    title += ', ';
                }
            }
            title += publikumsmottak[i].stedsbeskrivelse;
        }

        return title;
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
