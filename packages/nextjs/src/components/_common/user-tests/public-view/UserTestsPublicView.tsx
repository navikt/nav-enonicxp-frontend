import React from 'react';
import { isCurrentTimeInRange } from 'utils/datetime';
import { useIsClientSide } from 'utils/useIsClientSide';
import { UserTestsComponentProps } from 'components/_common/user-tests/UserTests';
import { UserTestVariant } from 'components/_common/user-tests/variants/UserTestVariant';
import {
    userTestGetSelectedVariantId,
    userTestSetSelection,
} from 'components/_common/user-tests/user-tests-cookies';
import { UserTestVariantProps } from 'types/content-props/user-tests-config';

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
): UserTestVariantProps | undefined => {
    const upperBound = getUpperBound(allVariants, selectedVariants);
    const selectedValue = Math.random() * upperBound;

    let lowerBound = 0;

    return selectedVariants.find((variant) => {
        lowerBound += variant.percentage;
        return lowerBound >= selectedValue;
    });
};

const pickApplicableVariant = ({
    tests,
    selectedTestIds,
}: UserTestsComponentProps): UserTestVariantProps | undefined => {
    const { variants, cookieId } = tests.data;

    const hasSelection = selectedTestIds.length > 0;

    const selectableVariants = hasSelection
        ? variants.filter((item) => selectedTestIds.includes(item.id))
        : variants;

    if (selectableVariants.length === 0) {
        return undefined;
    }

    const previouslySelectedVariantId = userTestGetSelectedVariantId(cookieId);
    if (previouslySelectedVariantId) {
        return selectableVariants.find((variant) => variant.id === previouslySelectedVariantId);
    }

    return selectRandomVariant(variants, selectableVariants);
};

const validateTimeRange = ({ tests }: UserTestsComponentProps) => {
    const { startTime, endTime } = tests.data;
    return isCurrentTimeInRange(startTime, endTime);
};

export const UserTestsPublicView = (props: UserTestsComponentProps) => {
    const isClientSide = useIsClientSide();
    if (!isClientSide) {
        return null;
    }

    const { data } = props.tests;

    const { cookieId } = data;

    if (!validateTimeRange(props)) {
        return null;
    }

    const variant = pickApplicableVariant(props);
    if (!variant) {
        return null;
    }

    userTestSetSelection(cookieId, variant.id);

    return <UserTestVariant testsData={data} variant={variant} />;
};
