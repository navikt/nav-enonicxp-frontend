import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { classNames } from 'utils/classnames';
import { UserTestsConfigData, UserTestVariantProps } from 'types/content-props/user-tests-config';

import style from './UserTestVariant.module.scss';

type Props = {
    testsData: UserTestsConfigData;
    variant: UserTestVariantProps;
    className?: string;
};

export const UserTestVariant = ({ testsData, variant, className }: Props) => {
    const { title, ingress } = testsData;

    const { title: variantTitle, ingress: variantIngress, url, linkText } = variant;

    return (
        <div className={classNames(style.testVariant, className)}>
            <Heading size={'medium'} level="2">
                {variantTitle ?? title}
            </Heading>
            <BodyLong>{variantIngress ?? ingress}</BodyLong>
            <LenkeInline href={url}>{linkText}</LenkeInline>
        </div>
    );
};
