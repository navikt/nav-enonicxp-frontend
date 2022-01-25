import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
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
    GuidePageProps
} from '../../../../types/content-props/dynamic-page-props';
import './ThemedPageHeader.less';
import { buildTaxonomyString } from 'utils/string';

const bem = BEM('themed-page-header');

type Props = {
    contentProps: SituationPageProps | ProductPageProps | GuidePageProps;
};

export const ThemedPageHeader = ({ contentProps }: Props) => {
    const { __typename: pageType, displayName, modifiedTime, data } = contentProps;
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
        if (_pageType === ContentType.EmployerSituationPage || _pageType === ContentType.SituationPage) {
            return 'situation'
        }

        if (_pageType === ContentType.ProductPage) {
            return 'product'
        }

        if (_pageType === ContentType.GuidePage) {
            return 'guide'
        }

        return ''
    };
    const pageTitle = title || displayName;
    const subTitle = getSubtitle();
    const modified = getDatesLabel('lastChanged') + ' ' + formatDate(modifiedTime, language, true);

    // This is a temporaty fix, especially for "Arbeidsavklaringspenger".
    // Will work with design to find solution for how long titles and illustration can stack better on mobile.
    const hasRoomForIllustrationOnMobile = pageTitle
        .split(' ')
        .every((word) => word.length < 18);

    return (
        <header
            className={classNames(
                bem(),
                bem(undefined,getPageTypeClass(pageType))
            )}
        >
            <Illustration
                illustration={illustration}
                placement={IllustrationPlacements.PRODUCT_PAGE_HEADER}
                className={classNames(
                    bem('illustration'),
                    !hasRoomForIllustrationOnMobile &&
                        bem('illustration', 'mobile-hidden')
                )}
            />
            <div className={bem('text')}>
                <PageHeader justify={'left'}>{pageTitle}</PageHeader>
                {(subTitle || modified) && (
                    <div className={bem('tagline-wrapper')}>
                        {subTitle &&<BodyShort size="small" className={bem('tagline-label')}>
                            {subTitle.toUpperCase()}
                        </BodyShort>}
                        {(subTitle && modified) &&
                            <span aria-hidden='true'
                                className={classNames('page-modified-info', bem('divider'))}
                            >
                                {'|'}
                            </span>
                        }
                        {modified && <BodyShort size="small"className={bem('modified-label')}>
                                <span className={'page-modified-info'}>{modified}</span>
                        </BodyShort>}
                    </div>
                )}
            </div>
        </header>
    );
};
