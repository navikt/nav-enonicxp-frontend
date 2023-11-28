import React from 'react';
import Cookie from 'js-cookie';
import { isDateTimeInRange } from 'utils/datetime';
import { useIsClientSide } from 'utils/useIsClientSide';

import style from './TestRecruiter.module.scss';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';

type TestVariant = {
    id: string;
    percentage: number;
    url: string;
    linkText: string;
    title?: string;
    ingress?: string;
};

export type TestRecruiterProps = {
    tests: {
        data: {
            variants: TestVariant[];
            title: string;
            ingress: string;
            groupId: string;
            startTime: string;
            endTime: string;
        };
    };
    selectedTestIds: string[];
};

const pickApplicableVariant = ({
    tests,
    selectedTestIds,
}: TestRecruiterProps): TestVariant | null => {
    const { variants } = tests.data;

    const possibleVariants =
        selectedTestIds.length > 0
            ? variants.filter((item) => selectedTestIds.includes(item.id))
            : variants;

    if (possibleVariants.length === 0) {
        return null;
    }

    return possibleVariants[0];
};

const validateTimeRange = ({ tests }: TestRecruiterProps) => {
    const { startTime, endTime } = tests.data;

    return isDateTimeInRange(startTime, endTime);
};

const userHasAlreadyParticipated = (groupId: string) => {
    const key = `tr-${groupId}`;
    return Cookie.get(key);
};

const TestRecruiterClientSide = (props: TestRecruiterProps) => {
    const { title, ingress, groupId } = props.tests.data;

    if (userHasAlreadyParticipated(groupId)) {
        console.log(`User already has cookie for ${groupId}`);
        return null;
    }

    if (!validateTimeRange(props)) {
        console.log('Not in valid time range');
        return null;
    }

    const variant = pickApplicableVariant(props);
    if (!variant) {
        console.log('No variant found');
        return null;
    }

    const {
        title: variantTitle,
        ingress: variantIngress,
        url,
        linkText,
    } = variant;

    return (
        <div className={style.testRecruiter}>
            <div className={style.header}>{variantTitle || title}</div>
            <div className={style.ingress}>{variantIngress || ingress}</div>
            <LenkeInline href={url}>{linkText}</LenkeInline>
        </div>
    );
};

export const TestRecruiter = (props: TestRecruiterProps) => {
    const isClientSide = useIsClientSide();

    return isClientSide ? (
        <TestRecruiterClientSide {...props} />
    ) : (
        <div>{'Hello!'}</div>
    );
};
