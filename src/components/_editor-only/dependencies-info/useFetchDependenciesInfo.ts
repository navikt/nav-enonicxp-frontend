import { useEffect, useState } from 'react';
import { xpDraftPathPrefix, xpServicePath } from 'utils/urls';
import { fetchJson } from 'utils/fetch/fetch-utils';
import {
    DependenciesData,
    DependenciesInfoSupportedContentType,
} from 'components/_editor-only/dependencies-info/types';

const serviceUrls: Record<DependenciesInfoSupportedContentType, string> = {
    'no.nav.navno:product-details': `${xpDraftPathPrefix}${xpServicePath}/productDetailsSelector/usage`,
    'no.nav.navno:video': `${xpDraftPathPrefix}${xpServicePath}/video/usage`,
    'portal:fragment': `${xpDraftPathPrefix}${xpServicePath}/htmlFragmentSelector/fragmentUsage`,
} as const;

export const useFetchDependenciesInfo = (
    contentId: string,
    contentLayer: string,
    type: DependenciesInfoSupportedContentType
) => {
    const [dependencies, setDependencies] = useState<DependenciesData | null>(
        null
    );
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchJson<DependenciesData>(
            `${serviceUrls[type]}?id=${contentId}&layer=${contentLayer}`,
            10000
        ).then((usageResponse) => {
            if (!usageResponse) {
                setIsError(true);
                return;
            }

            setDependencies(usageResponse);
            setIsError(false);
        });
    }, [contentId, contentLayer, type]);

    return { dependencies, isError };
};
