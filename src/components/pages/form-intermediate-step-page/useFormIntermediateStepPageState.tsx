import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    CompoundedSteps,
    FirstLevelStep,
    FormIntermediateStepPageProps,
    SecondLevelStep,
} from 'types/content-props/form-intermediate-step';
import { stripXpPathPrefix } from 'utils/urls';

const STEP_PARAM = 'stegvalg';

const getStepData = (
    data: FormIntermediateStepPageProps['data'],
    prevSelectedStep: number | null
): CompoundedSteps => {
    if (prevSelectedStep !== null) {
        const stepDetails = data.steps[prevSelectedStep].nextStep;
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

const getStateFromQueryParam = (url: string) => {
    const stepQuery = new URL(url, window.location.origin).searchParams.get(
        STEP_PARAM
    );

    return stepQuery ? Number(stepQuery) : null;
};

export const useFormIntermediateStepPageState = (
    props: FormIntermediateStepPageProps
) => {
    const [prevSelectedStep, setPrevSelectedStep] = useState<number | null>(
        null
    );
    const router = useRouter();

    const { data } = props;

    const getOnClickFromStep = (
        step: FirstLevelStep | SecondLevelStep,
        index: number
    ) => {
        return step.nextStep?._selected !== 'next'
            ? undefined
            : (e: React.MouseEvent) => {
                  e.preventDefault();
                  router.push(
                      `${window.location.pathname}?${STEP_PARAM}=${index}`,
                      undefined,
                      {
                          shallow: true,
                      }
                  );
              };
    };

    const getUrlFromStep = (step: FirstLevelStep | SecondLevelStep) => {
        if (step.nextStep?._selected === 'external') {
            return step.nextStep.external?.externalUrl;
        }

        if (step.nextStep?._selected === 'internal') {
            return stripXpPathPrefix(
                step.nextStep.internal?.internalContent._path
            );
        }

        return router.asPath;
    };

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setPrevSelectedStep(getStateFromQueryParam(url));
        };

        setPrevSelectedStep(getStateFromQueryParam(router.asPath));

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return {
        currentStepData: getStepData(data, prevSelectedStep),
        prevSelectedStep,
        getOnClickFromStep,
        getUrlFromStep,
    };
};
