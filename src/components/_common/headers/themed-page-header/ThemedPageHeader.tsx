import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { ContentType } from '../../../../types/content-props/_content-common';
import { BodyShort } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Illustration } from 'components/_common/illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import {
    ProductPageProps,
    SituationPageProps,
} from '../../../../types/content-props/dynamic-page-props';
import './ThemedPageHeader.less';

const bem = BEM('themed-page-header');

type Props = {
    contentProps: SituationPageProps | ProductPageProps;
};

export const ThemedPageHeader = ({ contentProps }: Props) => {
    const { __typename: pageType, displayName, data } = contentProps;
    const { title, illustration, taxonomy } = data;

    const { language } = usePageConfig();

    const getSubtitle = () => {
        if (pageType === ContentType.SituationPage) {
            const getTaxonomyLabel = translator('situations', language);
            return getTaxonomyLabel('youMayHaveRightTo');
        }
        const getTaxonomyLabel = translator('productTaxonomies', language);
        return taxonomy ? getTaxonomyLabel(taxonomy) : null;
    };

    const pageTitle = title || displayName;

    const subTitle = getSubtitle();

    const hasRoomForIllustrationOnMobile = pageTitle
        .split(' ')
        .every((word) => word.length < 18);

    return (
        <div
            className={classNames(
                bem(),
                pageType === ContentType.ProductPage &&
                    bem(undefined, 'product'),
                pageType === ContentType.SituationPage &&
                    bem(undefined, 'situation')
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
                {subTitle && (
                    <BodyShort size="s" className={bem('label')}>
                        {subTitle.toUpperCase()}
                    </BodyShort>
                )}
            </div>
        </div>
    );
};
