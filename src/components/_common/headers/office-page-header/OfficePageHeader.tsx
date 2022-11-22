import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { formatDate } from '../../../../utils/datetime';
import { ContentType } from '../../../../types/content-props/_content-common';
import { BodyShort, Detail } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Illustration } from 'components/_common/illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';

import { Audience } from '../../../../types/component-props/_mixins';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

import style from './OfficePageHeader.module.scss';
import { OfficeDetailsData } from 'types/content-props/office-details-props';

type Props = {
    showTimeStamp?: boolean;
    officeDetails: OfficeDetailsData;
};

export const OfficePageHeader = ({
    officeDetails,
    showTimeStamp = true,
}: Props) => {
    const { navn } = officeDetails;
    const { language } = usePageConfig();

    const getSubtitle = () => {
        const taxonomyArray = getTranslatedTaxonomies(taxonomy, language);
        return joinWithConjunction(taxonomyArray, language);
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
                        {modified && (
                            <Detail size="small">
                                <span className={'page-modified-info'}>
                                    {modified}
                                </span>
                            </Detail>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};
