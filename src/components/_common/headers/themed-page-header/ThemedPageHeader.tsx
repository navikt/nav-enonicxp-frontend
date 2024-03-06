import React from 'react';
import { classNames } from 'utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { formatDate } from 'utils/datetime';
import { ContentType } from 'types/content-props/_content-common';
import { BodyShort, Detail } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Illustration } from 'components/_common/illustration/Illustration';
import {
    ProductPageProps,
    SituationPageProps,
    GuidePageProps,
    ThemedArticlePageProps,
    GenericPageProps,
    OfficeEditorialPageProps,
    OfficeBranchPageProps,
} from 'types/content-props/dynamic-page-props';
import { OverviewPageProps } from 'types/content-props/overview-props';
import {
    getAudience,
    getSubAudience,
    Audience,
} from 'types/component-props/_mixins';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';
import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';

import style from './ThemedPageHeader.module.scss';

type ContentProps =
    | GenericPageProps
    | GuidePageProps
    | OfficeBranchPageProps
    | OfficeEditorialPageProps
    | OverviewPageProps
    | ProductPageProps
    | SituationPageProps
    | ThemedArticlePageProps
    | FormIntermediateStepPageProps;

type Props = {
    showTimeStamp?: boolean;
    contentProps: ContentProps;
};

export const ThemedPageHeader = ({
    contentProps,
    showTimeStamp = true,
}: Props) => {
    const { type: pageType, displayName, modifiedTime, data } = contentProps;

    const { language } = usePageConfig();

    const getProps = () => {
        if (pageType === ContentType.OfficeEditorialPage) {
            const title = displayName;
            return { title };
        }
        const { title, illustration, taxonomy, audience, customCategory } =
            data;
        return { title, illustration, taxonomy, audience, customCategory };
    };

    const { audience, title, taxonomy, customCategory, illustration } =
        getProps();

    const currentAudience = getAudience(audience);
    const subAudience = getSubAudience(audience);

    const getSubtitle = () => {
        if (currentAudience === Audience.PROVIDER && subAudience?.length > 0) {
            const getStringParts = translator('stringParts', language);
            const getSubAudienceLabel = translator(
                'providerAudience',
                language
            );
            const subAudienceLabels = subAudience.map((audience) =>
                getSubAudienceLabel(audience).toLowerCase()
            );
            return `${getStringParts('for')} ${joinWithConjunction(
                subAudienceLabels,
                language
            )}`;
        }

        if (pageType === ContentType.SituationPage) {
            const getTaxonomyLabel = translator('situations', language);
            return getTaxonomyLabel(currentAudience);
        }

        if (pageType === ContentType.GuidePage) {
            const getTaxonomyLabel = translator('guides', language);
            return getTaxonomyLabel(currentAudience);
        }

        if (pageType === ContentType.Overview) {
            const getTaxonomyLabel = translator('overview', language);
            return getTaxonomyLabel('any');
        }

        if (
            pageType === ContentType.ThemedArticlePage ||
            pageType === ContentType.FormIntermediateStepPage
        ) {
            const taxonomyArray = getTranslatedTaxonomies(taxonomy, language);
            const allCategories = customCategory
                ? [...taxonomyArray, customCategory]
                : taxonomyArray;

            return joinWithConjunction(allCategories, language);
        }

        if (
            pageType === ContentType.ProductPage &&
            currentAudience === Audience.EMPLOYER
        ) {
            const getTaxonomyLabel = translator('products', language);
            return getTaxonomyLabel(Audience.EMPLOYER);
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

        if (_pageType === ContentType.FormIntermediateStepPage) {
            return 'intermediateStep';
        }

        if (_pageType === ContentType.Overview) {
            return 'overview';
        }

        if (_pageType === ContentType.GenericPage) {
            return 'generic';
        }

        return '';
    };

    const pageTitle = title || displayName;
    const subTitle = getSubtitle();
    const modified =
        showTimeStamp &&
        getDatesLabel('lastChanged') +
            ' ' +
            formatDate({
                datetime: modifiedTime,
                language,
                short: true,
                year: true,
            });

    return (
        <div
            className={classNames(
                style.themedPageHeader,
                style[getPageTypeClass(pageType)]
            )}
        >
            <Illustration
                illustration={illustration}
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
                            <span aria-hidden="true" className={style.divider}>
                                {'|'}
                            </span>
                        )}
                        {modified && <Detail>{modified}</Detail>}
                    </div>
                )}
            </div>
        </div>
    );
};
