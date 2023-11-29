import React from 'react';
import { isDateTimeInRange } from 'utils/datetime';
import { useIsClientSide } from 'utils/useIsClientSide';
import {
    UserTestsProps,
    UserTestVariantProps,
} from 'components/_common/user-tests/UserTests';
import { UserTestVariant } from 'components/_common/user-tests/variants/UserTestVariant';
import {
    userTestDidUserParticipate,
    userTestGetSelectedVariantId,
    userTestSetParticipation,
    userTestSetSelection,
} from 'components/_common/user-tests/user-tests-utils';

const sumPercentages = (variants: UserTestVariantProps[]) =>
    variants.reduce((acc, variant) => acc + variant.percentage, 0);

const getUpperBound = (
    allVariants: UserTestVariantProps[],
    selectedVariants: UserTestVariantProps[]
) => {
    const percentageTotal = sumPercentages(allVariants);

    const maxValue = Math.max(percentageTotal, 100);

    if (allVariants.length === selectedVariants.length) {
        return maxValue;
    }

    // If only a subset of variants has been selected, we want the relative chance to select a test
    // to be the same as if all variants were included in the selection
    const selectionTotal = sumPercentages(selectedVariants);

    return maxValue * (selectionTotal / percentageTotal);
};

const selectRandomVariant = (
    allVariants: UserTestVariantProps[],
    selectedVariants: UserTestVariantProps[]
): UserTestVariantProps | null => {
    const upperBound = getUpperBound(allVariants, selectedVariants);
    const selectedValue = Math.random() * upperBound;

    console.log(`Selected ${selectedValue} / ${upperBound}`);

    let lowerBound = 0;

    return selectedVariants.find((variant) => {
        lowerBound += variant.percentage;
        return lowerBound > selectedValue;
    });
};

const pickApplicableVariant = ({
    tests,
    selectedTestIds,
}: UserTestsProps): UserTestVariantProps | null => {
    const { variants, cookieId } = tests.data;

    const hasSelection = selectedTestIds.length > 0;

    const selectableVariants = hasSelection
        ? variants.filter((item) => selectedTestIds.includes(item.id))
        : variants;

    if (selectableVariants.length === 0) {
        return null;
    }

    const previouslySelectedVariantId = userTestGetSelectedVariantId(cookieId);
    if (previouslySelectedVariantId) {
        return selectableVariants.find(
            (variant) => variant.id === previouslySelectedVariantId
        );
    }

    return selectRandomVariant(variants, selectableVariants);
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

    const { data } = props.tests;

    const { cookieId } = data;

    if (userTestDidUserParticipate(cookieId)) {
        console.log(`User already participated in ${cookieId}`);
        return null;
    }

    if (!validateTimeRange(props)) {
        console.log('Not in valid time range');
        return null;
    }

    const variant = pickApplicableVariant(props);
    if (!variant) {
        console.log('No variant found');
        userTestSetParticipation(cookieId);
        return null;
    }

    userTestSetSelection(cookieId, variant.id);

    return (
        <UserTestVariant
            testsData={data}
            variant={variant}
            persistParticipation={true}
        />
    );
};
