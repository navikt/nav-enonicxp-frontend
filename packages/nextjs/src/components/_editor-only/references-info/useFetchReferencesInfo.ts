import { useEffect, useState } from 'react';
import { fetchJson } from '@/shared/fetch-utils';
import { xpDraftPathPrefix, xpServicePath } from 'utils/urls';
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
          result: 'loading';
      }
    | {
          result: 'notimpl';
      };

const SERVICE_URL = `${xpDraftPathPrefix}${xpServicePath}/references`;

export const useFetchReferencesInfo = (contentId: string, contentLayer?: string) => {
    const [references, setReferences] = useState<ServiceResponse>({
        result: 'notimpl',
    });

    useEffect(() => {
        setReferences({
            result: 'loading',
        });

        fetchJson<ServiceResponse>(
            `${SERVICE_URL}?contentId=${contentId}&locale=${contentLayer}`,
            10000
        ).then((usageResponse) => {
            if (!usageResponse) {
                setReferences({
                    result: 'error',
                    message: 'Ukjent feil - kunne ikke laste avhengigheter',
                });
                return;
            }

            setReferences(usageResponse);
        });
    }, [contentId, contentLayer]);

    return { references };
};
