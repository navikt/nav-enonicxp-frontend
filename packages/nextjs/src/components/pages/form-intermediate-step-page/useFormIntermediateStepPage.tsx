import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import {
    FormIntermediateStepPageProps,
    SelectableStep,
    StepBase,
} from 'types/content-props/form-intermediate-step';
import { stripXpPathPrefix } from 'utils/urls';

const STEP_PARAM = 'stegvalg';

export type FormIntermediateStep_StepLinkData = SelectableStep & {
    href?: string;
    isStepNavigation?: boolean;
};

type StepPath = number[];
const buildStepUrl = (basePath: string, stepPath: StepPath) =>
    `${basePath}?${STEP_PARAM}=${stepPath.join(',')}`;

const resolveStepUrl = ({
    step,
    nextStepPath,
    basePath,
}: {
    step: SelectableStep;
    nextStepPath: StepPath;
    basePath: string;
}): FormIntermediateStep_StepLinkData => {
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
                href: buildStepUrl(basePath, nextStepPath),
                isStepNavigation: true,
            };
        }
    }
};

const getStepData = (data: FormIntermediateStepPageProps['data'], stepPath: StepPath): StepBase => {
    // No steps selected (meaning the user is on first step)
    if (stepPath.length === 0) {
        return {
            editorial: data.editorial,
            stepsHeadline: data.stepsHeadline,
            steps: data.steps,
        };
    }

    let tmp: any = data;

    stepPath.forEach((index) => {
        const foundStep = tmp.steps[index];
        if (foundStep) {
            tmp = foundStep.nextStep?.next;
        }
    });

    const stepDetails = tmp.nextStep;
    if (stepDetails?._selected === 'next') {
        return stepDetails.next;
    }

    return {
        editorial: tmp.editorial,
        stepsHeadline: tmp.stepsHeadline,
        steps: tmp.steps,
    };
};

const buildCurrentStepData = (
    allData: FormIntermediateStepPageProps['data'],
    basePath: string,
    stepPath: StepPath
): StepBase => {
    const stepData = getStepData(allData, stepPath);

    return {
        ...stepData,
        steps: stepData.steps.map((step, index) =>
            resolveStepUrl({ step, nextStepPath: [...stepPath, index], basePath })
        ),
    };
};

const buildBackUrl = (basePath: string, stepPath: StepPath): string | null => {
    if (stepPath.length === 0) {
        return null; // No back URL if on the first step
    }

    if (stepPath.length === 1) {
        return basePath; // Back to the first step
    }
    return buildStepUrl(basePath, stepPath.slice(0, -1));
};

const getStepPathFromParam = (url: string): StepPath => {
    const stepQuery = new URL(url, window.location.origin).searchParams.get(STEP_PARAM);
    const stepPath = stepQuery ? stepQuery.split(',').map(Number) : [];
    if (stepPath.some(isNaN)) {
        return [];
    }
    return stepPath;
};

const getPreviousStepTitle = (
    stepPath: StepPath,
    allData: FormIntermediateStepPageProps['data']
) => {
    if (stepPath.length === 0) {
        return null; // No previous step title if on the first step
    }

    const previousStepPath = stepPath.slice(0, -1);

    // Previous step was the first page, so just get the
    // headline from the data root.
    if (previousStepPath.length === 0) {
        return allData.stepsHeadline;
    }

    // Traverse the tree to find the previous step.
    let step: StepBase = allData;
    previousStepPath.forEach((index) => {
        const foundStep = step.steps[index];
        if (foundStep) {
            step = foundStep.nextStep?.next;
        }
    });

    return step.stepsHeadline;
};

export const useFormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const [stepPath, setStepPath] = useState<StepPath>([]);
    const router = useRouter();

    const pagePath = stripXpPathPrefix(props._path);
    const currentStepData = buildCurrentStepData(props.data, pagePath, stepPath);

    const backUrl = buildBackUrl(pagePath, stepPath);
    const previousStepTitle = getPreviousStepTitle(stepPath, props.data);

    useEffect(() => {
        if (!router) {
            return;
        }

        const handleRouteChange = (url: string) => {
            setStepPath(getStepPathFromParam(url));
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
        previousStepTitle,
    };
};
