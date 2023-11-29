import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import {
    UserTestsData,
    UserTestVariantProps,
} from 'components/_common/user-tests/UserTests';
import { classNames } from 'utils/classnames';
import { userTestSetParticipation } from 'components/_common/user-tests/user-tests-utils';

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
        <div className={classNames(style.userTests, className)}>
            <Heading className={style.header} size={'medium'}>
                {variantTitle || title}
            </Heading>
            <BodyLong className={style.ingress}>
                {variantIngress || ingress}
            </BodyLong>
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
