import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import { SelectableStep, StepBase } from 'types/content-props/form-intermediate-step';
import { stripXpPathPrefix } from 'utils/urls';
import { FormIntermediateStepPageProps } from './FormIntermediateStepPage';

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

const getStepData = (
    data: FormIntermediateStepPageProps['data'],
    stepPath: StepPath,
): StepBase => {
    // No steps selected (meaning the user is on first step)
    if (stepPath.length === 0) {
        return {
            textAboveTitle: '',
            title: data.title,
            editorial: data.editorial,
            steps: data.steps,
            previousStepExplanation: '',
        };
    }

    let tmp: any = data;
    let lastStepLabel: string | undefined;
    let previousStepExplanation: string | undefined;

    stepPath.forEach((index) => {
        const foundStep = tmp.steps[index];
        if (foundStep) {
            lastStepLabel = foundStep.label;
            previousStepExplanation = foundStep.explanation;
            tmp = foundStep.nextStep?.next;
        }
    });

    const stepDetails = tmp.nextStep;
    if (stepDetails?._selected === 'next') {
        return stepDetails.next;
    }

    return {
        textAboveTitle: data.title,
        title: lastStepLabel,
        editorial: tmp.editorial,
        steps: tmp.steps,
        previousStepExplanation,
    };
};

const buildCurrentStepData = (
    allData: FormIntermediateStepPageProps['data'],
    basePath: string,
    stepPath: StepPath,
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

export const useFormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const [stepPath, setStepPath] = useState<StepPath>([]);
    const router = useRouter();

    const pagePath = stripXpPathPrefix(props._path);
    const currentStepData = buildCurrentStepData(props.data, pagePath, stepPath);

    const backUrl = buildBackUrl(pagePath, stepPath);

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
    };
};
