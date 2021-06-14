import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { ContentType } from '../../../../types/content-props/_content-common';
import { Undertekst } from 'nav-frontend-typografi';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Illustration } from 'components/_common/illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import './ThemedPageHeader.less';
import {
    ProductPageProps,
    SituationPageProps,
} from '../../../../types/content-props/dynamic-page-props';

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
                className={bem('illustration')}
            />
            <div className={bem('text')}>
                <PageHeader justify={'left'}>{pageTitle}</PageHeader>
                {subTitle && (
                    <Undertekst className={bem('label')}>
                        {subTitle.toUpperCase()}
                    </Undertekst>
                )}
            </div>
        </div>
    );
};
