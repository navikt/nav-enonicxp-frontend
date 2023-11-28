import { isDateTimeInRange } from 'utils/datetime';
import React from 'react';
import {
    TestRecruiterProps,
    TestVariantProps,
} from 'components/_common/test-recruiter/TestRecruiter';
import Cookie from 'js-cookie';
import { TestVariant } from 'components/_common/test-recruiter/test-variant/TestVariant';
import { useIsClientSide } from 'utils/useIsClientSide';

const pickApplicableVariant = ({
    tests,
    selectedTestIds,
}: TestRecruiterProps): TestVariantProps | null => {
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

export const TestRecruiterPublicView = (props: TestRecruiterProps) => {
    const isClientSide = useIsClientSide();
    if (!isClientSide) {
        return null;
    }

    const testsData = props.tests.data;

    if (Cookie.get(testsData.groupId)) {
        console.log(`User already has cookie for ${testsData.groupId}`);
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

    return (
        <TestVariant
            testsData={testsData}
            variant={variant}
            persistOnClick={true}
        />
    );
};
