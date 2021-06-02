import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { ContentType } from '../../../../types/content-props/_content-common';
import { ProductLabel } from '../../../../types/content-props/dynamic-page-props';
import { Undertekst } from 'nav-frontend-typografi';
import { PublicImage } from '../../image/PublicImage';
import './ProductPageHeader.less';

const bem = BEM('product-page-header');

type Props = {
    pageType: ContentType.ContentPageWithSidemenus | ContentType.SituationPage;
    label?: ProductLabel;
    illustration?: any;
    children: string;
};

export const ProductPageHeader = ({
    pageType,
    label,
    illustration,
    children,
}: Props) => {
    return (
        <div
            className={classNames(
                bem(),
                pageType === ContentType.ContentPageWithSidemenus &&
                    bem(undefined, 'product'),
                pageType === ContentType.SituationPage &&
                    bem(undefined, 'situation')
            )}
        >
            <div className={bem('image')}>
                <PublicImage imagePath={'/favicon.ico'} alt={''} />
            </div>
            <div className={bem('text')}>
                <PageHeader justify={'left'}>{children}</PageHeader>
                {label && (
                    <Undertekst className={bem('label')}>
                        {label.toUpperCase()}
                    </Undertekst>
                )}
            </div>
        </div>
    );
};
