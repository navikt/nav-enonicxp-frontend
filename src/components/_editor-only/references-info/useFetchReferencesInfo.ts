import { useEffect, useState } from 'react';
import { xpDraftPathPrefix, xpServicePath } from 'utils/urls';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { ReferencesDataByType } from 'components/_editor-only/references-info/types';

type ServiceResponse =
    | {
          result: 'success';
          references: ReferencesDataByType;
      }
    | {
          result: 'error';
          message: string;
      }
    | {
          result: 'notimpl';
      };

const serviceUrl = `${xpDraftPathPrefix}${xpServicePath}/references`;

export const useFetchReferencesInfo = (
    contentId: string,
    contentLayer: string
) => {
    const [references, setReferences] = useState<ReferencesDataByType>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoaded(false);

        fetchJson<ServiceResponse>(
            `${serviceUrl}?contentId=${contentId}&locale=${contentLayer}`,
            10000
        ).then((usageResponse) => {
            setIsLoaded(true);

            if (!usageResponse) {
                setIsError(true);
                return;
            }

            if (usageResponse.result === 'success') {
                setReferences(usageResponse.references);
            }

            setIsError(false);
        });
    }, [contentId, contentLayer]);

    return { references, isError, isLoaded };
};
