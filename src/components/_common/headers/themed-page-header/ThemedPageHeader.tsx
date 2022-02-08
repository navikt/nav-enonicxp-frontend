import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { formatDate } from '../../../../utils/datetime';
import { ContentType } from '../../../../types/content-props/_content-common';
import { BodyShort } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Illustration } from 'components/_common/illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import {
    ProductPageProps,
    SituationPageProps,
    GuidePageProps,
} from '../../../../types/content-props/dynamic-page-props';
import { buildTaxonomyString } from 'utils/string';

import style from './ThemedPageHeader.module.scss';

type Props = {
    contentProps: SituationPageProps | ProductPageProps | GuidePageProps;
};

export const ThemedPageHeader = ({ contentProps }: Props) => {
    const {
        __typename: pageType,
        displayName,
        modifiedTime,
        data,
    } = contentProps;
    const { title, illustration, taxonomy } = data;
    const { language } = usePageConfig();
    const getSubtitle = () => {
        if (pageType === ContentType.SituationPage) {
            const getTaxonomyLabel = translator('situations', language);
            return getTaxonomyLabel('youMayHaveRightTo');
        }
        if (pageType === ContentType.EmployerSituationPage) {
            const getTaxonomyLabel = translator('situations', language);
            return getTaxonomyLabel('employerNeedToKnow');
        }
        if (pageType === ContentType.GuidePage) {
            const getTaxonomyLabel = translator('guides', language);
            return getTaxonomyLabel('howTo');
        }
        return buildTaxonomyString(taxonomy, language);
    };
    const getDatesLabel = translator('dates', language);
    const getPageTypeClass = (_pageType: ContentType) => {
        if (
            _pageType === ContentType.EmployerSituationPage ||
            _pageType === ContentType.SituationPage
        ) {
            return 'Situation';
        }
        if (_pageType === ContentType.ProductPage) {
            return 'Product';
        }
        if (_pageType === ContentType.GuidePage) {
            return 'Guide';
        }
        return '';
    };
    const pageTitle = title || displayName;
    const subTitle = getSubtitle();
    const modified =
        getDatesLabel('lastChanged') +
        ' ' +
        formatDate(modifiedTime, language, true);

    return (
        <header
            className={classNames(
                style.themedPageHeader,
                style[`themedPageHeader${getPageTypeClass(pageType)}`]
            )}
        >
            <Illustration
                illustration={illustration}
                placement={IllustrationPlacements.PRODUCT_PAGE_HEADER}
                className={style.themedPageHeader__illustration}
            />
            <div className={style.themedPageHeader__text}>
                <PageHeader justify={'left'}>{pageTitle}</PageHeader>
                {(subTitle || modified) && (
                    <div className={style.themedPageHeader__taglineWrapper}>
                        {subTitle && (
                            <BodyShort
                                size="small"
                                className={style.themedPageHeader__taglineLabel}
                            >
                                {subTitle.toUpperCase()}
                            </BodyShort>
                        )}
                        {subTitle && modified && (
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    'page-modified-info',
                                    style.themedPageHeader__divider
                                )}
                            >
                                {'|'}
                            </span>
                        )}
                        {modified && (
                            <BodyShort
                                size="small"
                                className={
                                    style.themedPageHeader__modifiedLabel
                                }
                            >
                                <span className={'page-modified-info'}>
                                    {modified}
                                </span>
                            </BodyShort>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};
