import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import {
    UserTestsData,
    UserTestVariantProps,
} from 'components/_common/user-tests/UserTests';
import { classNames } from 'utils/classnames';
import { userTestSetParticipation } from 'components/_common/user-tests/user-tests-cookies';

import style from './UserTestVariant.module.scss';

type Props = {
    testsData: UserTestsData;
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
            <Heading size={'medium'} level="2">
                {variantTitle || title}
            </Heading>
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
