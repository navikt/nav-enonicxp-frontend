import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import {
    TestRecruiterProps,
    TestVariantProps,
} from 'components/_common/test-recruiter/TestRecruiter';
import Cookie from 'js-cookie';

import style from './TestVariant.module.scss';

type TestsData = TestRecruiterProps['tests']['data'];

type Props = {
    testsData: TestsData;
    variant: TestVariantProps;
    persistOnClick?: boolean;
};

export const TestVariant = ({ testsData, variant, persistOnClick }: Props) => {
    const { title, ingress, groupId } = testsData;

    const {
        title: variantTitle,
        ingress: variantIngress,
        url,
        linkText,
    } = variant;

    return (
        <div className={style.testRecruiter}>
            <Heading className={style.header} size={'medium'}>
                {variantTitle || title}
            </Heading>
            <BodyLong className={style.ingress}>
                {variantIngress || ingress}
            </BodyLong>
            <LenkeInline
                href={url}
                onClick={
                    persistOnClick ? () => Cookie.set(groupId, true) : undefined
                }
            >
                {linkText}
            </LenkeInline>
        </div>
    );
};
