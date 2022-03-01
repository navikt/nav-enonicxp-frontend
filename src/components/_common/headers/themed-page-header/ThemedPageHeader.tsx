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
import {
    ProductPageProps,
    SituationPageProps,
    GuidePageProps,
    ThemedArticlePageProps,
} from '../../../../types/content-props/dynamic-page-props';
import { Audience } from '../../../../types/component-props/_mixins';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

import style from './ThemedPageHeader.module.scss';

type Props = {
    contentProps:
        | SituationPageProps
        | ProductPageProps
        | GuidePageProps
        | ThemedArticlePageProps;
};

export const ThemedPageHeader = ({ contentProps }: Props) => {
    const {
        __typename: pageType,
        displayName,
        modifiedTime,
        data,
    } = contentProps;
    const {
        title,
        illustration,
        taxonomy,
        audience = Audience.PERSON,
        customCategory,
    } = data;

    const { language } = usePageConfig();

    const getSubtitle = () => {
        if (pageType === ContentType.SituationPage) {
            const getTaxonomyLabel = translator('situations', language);
            return getTaxonomyLabel(audience);
        }

        if (pageType === ContentType.GuidePage) {
            const getTaxonomyLabel = translator('guides', language);
            return getTaxonomyLabel(audience);
        }

        if (pageType === ContentType.ThemedArticlePage) {
            const taxonomyArray = getTranslatedTaxonomies(taxonomy, language);
            const allCategories = customCategory
                ? [...taxonomyArray, customCategory]
                : taxonomyArray;

            return joinWithConjunction(allCategories, language);
        }

        if (
            pageType === ContentType.ProductPage &&
            (audience === Audience.EMPLOYER || audience === Audience.PROVIDER)
        ) {
            const getTaxonomyLabel = translator('products', language);
            return getTaxonomyLabel(audience);
        }

        const taxonomyArray = getTranslatedTaxonomies(taxonomy, language);
        return joinWithConjunction(taxonomyArray, language);
    };

    const getDatesLabel = translator('dates', language);

    const getPageTypeClass = (_pageType: ContentType) => {
        if (_pageType === ContentType.SituationPage) {
            return 'situation';
        }

        if (_pageType === ContentType.ProductPage) {
            return 'product';
        }

        if (_pageType === ContentType.GuidePage) {
            return 'guide';
        }

        if (_pageType === ContentType.ThemedArticlePage) {
            return 'themedpage';
        }

        if (_pageType === ContentType.ToolsPage) {
            return 'tool';
        }

        return '';
    };

    const pageTitle = title || displayName;
    const subTitle = getSubtitle();
    const modified =
        getDatesLabel('lastChanged') +
        ' ' +
        formatDate(modifiedTime, language, true);

    // This is a temporaty fix, especially for "Arbeidsavklaringspenger".
    // Will work with design to find solution for how long titles and illustration can stack better on mobile.
    const hasRoomForIllustrationOnMobile = pageTitle
        .split(' ')
        .every((word) => word.length < 18);

    return (
        <header
            className={classNames(
                style.themedPageHeader,
                style[getPageTypeClass(pageType)]
            )}
        >
            <Illustration
                illustration={illustration}
                placement={IllustrationPlacements.PRODUCT_PAGE_HEADER}
                className={style.illustration}
            />
            <div className={style.text}>
                <PageHeader justify={'left'}>{pageTitle}</PageHeader>
                {(subTitle || modified) && (
                    <div className={style.taglineWrapper}>
                        {subTitle && (
                            <BodyShort
                                size="small"
                                className={style.taglineLabel}
                            >
                                {subTitle.toUpperCase()}
                            </BodyShort>
                        )}
                        {subTitle && modified && (
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
