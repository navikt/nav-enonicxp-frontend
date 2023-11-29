import React from 'react';
import { isDateTimeInRange } from 'utils/datetime';
import Cookie from 'js-cookie';
import { useIsClientSide } from 'utils/useIsClientSide';
import {
    UserTestsProps,
    UserTestVariantProps,
} from 'components/_common/user-tests/UserTests';
import { UserTestVariant } from 'components/_common/user-tests/variants/UserTestVariant';

const pickApplicableVariant = ({
    tests,
    selectedTestIds,
}: UserTestsProps): UserTestVariantProps | null => {
    const { variants } = tests.data;

    const selectableVariants =
        selectedTestIds.length > 0
            ? variants.filter((item) => selectedTestIds.includes(item.id))
            : variants;

    if (selectableVariants.length === 0) {
        return null;
    }

    return selectableVariants[0];
};

const validateTimeRange = ({ tests }: UserTestsProps) => {
    const { startTime, endTime } = tests.data;
    return isDateTimeInRange(startTime, endTime);
};

export const UserTestsPublicView = (props: UserTestsProps) => {
    const isClientSide = useIsClientSide();
    if (!isClientSide) {
        return null;
    }

    const testsData = props.tests.data;

    if (Cookie.get(testsData.cookieId)) {
        console.log(`User already has cookie for ${testsData.cookieId}`);
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
        <UserTestVariant
            testsData={testsData}
            variant={variant}
            persistOnClick={true}
        />
    );
};
