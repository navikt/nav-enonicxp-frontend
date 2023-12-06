import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { classNames } from 'utils/classnames';
import { userTestSetParticipation } from 'components/_common/user-tests/user-tests-cookies';

import style from './UserTestVariant.module.scss';
import {
    UserTestsConfigData,
    UserTestVariantProps,
} from 'types/content-props/user-tests-config';

type Props = {
    testsData: UserTestsConfigData;
    variant: UserTestVariantProps;
    persistParticipation?: boolean;
    className?: string;
};

export const UserTestVariant = ({
    testsData,
    variant,
    persistParticipation,
    className,
}: Props) => {
    const { title, ingress, cookieId } = testsData;

    const {
        title: variantTitle,
        ingress: variantIngress,
        url,
        linkText,
    } = variant;

    return (
        <div className={classNames(style.testVariant, className)}>
            <Heading size={'medium'}>{variantTitle || title}</Heading>
            <BodyLong>{variantIngress || ingress}</BodyLong>
            <LenkeInline
                href={url}
                onClick={
                    persistParticipation
                        ? () => userTestSetParticipation(cookieId)
                        : undefined
                }
            >
                {linkText}
            </LenkeInline>
        </div>
    );
};
