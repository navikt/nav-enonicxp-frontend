import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ReferencesInfoResult } from 'components/_editor-only/references-info/result/ReferencesInfoResult';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { useFetchReferencesInfo } from 'components/_editor-only/references-info/useFetchReferencesInfo';
import { ContentProps } from 'types/content-props/_content-common';

import style from './ReferencesInfo.module.scss';

type Props = {
    content: ContentProps;
};

export const ReferencesInfo = ({ content }: Props) => {
    const { _id: contentId, contentLayer } = content;

    const { references, isError } = useFetchReferencesInfo(
        contentId,
        contentLayer
    );

    if (!references) {
        return null;
    }

    return (
        <div className={style.container}>
            {isError ? (
                <AlertBox variant={'error'} inline={true}>
                    <Heading level={'3'} size={'small'}>
                        {
                            'Obs: lasting av avhengigheter feilet! Dette innholdet kan være i bruk på andre sider.'
                        }
                    </Heading>
                    <BodyLong>
                        {'Forsøk å laste inn editoren på nytt.'}
                    </BodyLong>
                </AlertBox>
            ) : (
                <ReferencesInfoResult
                    references={references}
                    content={content}
                />
            )}
        </div>
    );
};
