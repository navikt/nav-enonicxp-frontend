import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import {
    FormIntermediateStepPageProps,
    FormIntermediateStep_CompoundedStepData,
    FormIntermediateStep_StepBase,
    FormIntermediateStep_StepData,
    FormIntermediateStep_StepLevel,
} from 'types/content-props/form-intermediate-step';
import { stripXpPathPrefix } from 'utils/urls';

const STEP_PARAM = 'stegvalg';

export type FormIntermediateStep_StepLinkData = FormIntermediateStep_StepBase & {
    href?: string;
    isStepNavigation?: boolean;
};

type CurrentStepData = FormIntermediateStep_StepData<FormIntermediateStep_StepLinkData>;

const buildStepUrl = (basePath: string, stepIndex: number) =>
    `${basePath}?${STEP_PARAM}=${stepIndex}`;

const resolveStepUrl = (
    step: FormIntermediateStep_StepLevel,
    stepIndex: number,
    basePath: string
): FormIntermediateStep_StepLinkData => {
    switch (step.nextStep?._selected) {
        case 'external': {
            return {
                ...step,
                href: step.nextStep.external?.externalUrl,
            };
        }
        case 'internal': {
            return {
                ...step,
                href: stripXpPathPrefix(step.nextStep.internal?.internalContent._path),
            };
        }
        default: {
            return {
                ...step,
                href: buildStepUrl(basePath, stepIndex),
                isStepNavigation: true,
            };
        }
    }
};

const getStepData = (
    data: FormIntermediateStepPageProps['data'],
    selectedStepIndex: number | null
): FormIntermediateStep_CompoundedStepData => {
    if (selectedStepIndex !== null) {
        const stepDetails = data.steps[selectedStepIndex].nextStep;
        if (stepDetails?._selected === 'next') {
            return stepDetails.next;
        }
    }

    return {
        editorial: data.editorial,
        stepsHeadline: data.stepsHeadline,
        steps: data.steps,
    };
};

const buildResolvedStepData = (
    data: FormIntermediateStepPageProps['data'],
    basePath: string,
    prevSelectedStep: number | null
): CurrentStepData => {
    const stepData = getStepData(data, prevSelectedStep);

    return {
        ...stepData,
        steps: stepData.steps.map((step, index) => resolveStepUrl(step, index, basePath)),
    };
};

const getSelectedStepFromParam = (url: string) => {
    const stepQuery = new URL(url, window.location.origin).searchParams.get(STEP_PARAM);
    return stepQuery ? Number(stepQuery) : null;
};

export const useFormIntermediateStepPageState = (props: FormIntermediateStepPageProps) => {
    const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
    const router = useRouter();

    const pagePath = stripXpPathPrefix(props._path);

    const currentStepData = buildResolvedStepData(props.data, pagePath, selectedStepIndex);

    const backUrl = selectedStepIndex !== null ? pagePath : null;

    useEffect(() => {
        if (!router) {
            return;
        }

        const handleRouteChange = (url: string) => {
            setSelectedStepIndex(getSelectedStepFromParam(url));
        };

        handleRouteChange(router.asPath);

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return {
        currentStepData,
        backUrl,
    };
};
