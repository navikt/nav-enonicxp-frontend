import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageHeader } from '../../../_common/header/PageHeader';
import './ProductPageHeader.less';
import { ContentType } from '../../../../types/content-props/_content-common';
import { ProductLabel } from '../../../../types/content-props/dynamic-page-props';
import { Undertekst } from 'nav-frontend-typografi';

const bem = BEM('product-page-header');

type Props = {
    pageType: ContentType.ProductPage | ContentType.SituationPage;
    label?: ProductLabel;
    children: string;
};

export const ProductPageHeader = ({ pageType, label, children }: Props) => {
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
            <PageHeader justify={'left'}>{children}</PageHeader>
            {label && (
                <Undertekst className={bem('label')}>
                    {label.toUpperCase()}
                </Undertekst>
            )}
        </div>
    );
};
