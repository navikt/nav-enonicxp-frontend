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

const SERVICE_URL = `${xpDraftPathPrefix}${xpServicePath}/references`;

export const useFetchReferencesInfo = (
    contentId: string,
    contentLayer: string
) => {
    const [references, setReferences] = useState<ReferencesDataByType | null>(
        null
    );
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchJson<ServiceResponse>(
            `${SERVICE_URL}?contentId=${contentId}&locale=${contentLayer}`,
            10000
        ).then((usageResponse) => {
            if (!usageResponse || usageResponse.result === 'error') {
                setIsError(true);
                setReferences({});
                return;
            }

            setIsError(false);

            if (usageResponse.result === 'success') {
                setReferences(usageResponse.references);
            } else if (usageResponse.result === 'notimpl') {
                setReferences(null);
            }
        });
    }, [contentId, contentLayer]);

    return { references, isError };
};
