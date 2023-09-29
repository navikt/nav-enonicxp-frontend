import React from 'react';
import { BodyLong, BodyShort, Heading, Loader } from '@navikt/ds-react';
import { DependenciesInfoResult } from 'components/_editor-only/dependencies-info/result/DependenciesInfoResult';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { useFetchDependenciesInfo } from 'components/_editor-only/dependencies-info/useFetchDependenciesInfo';
import { DependenciesInfoSupportedContentType } from 'components/_editor-only/dependencies-info/types';

import style from './DependenciesInfo.module.scss';

type Props = {
    contentId: string;
    contentLayer: string;
    type: DependenciesInfoSupportedContentType;
};

export const DependenciesInfo = ({ contentId, contentLayer, type }: Props) => {
    const { dependencies, isError } = useFetchDependenciesInfo(
        contentId,
        contentLayer,
        type
    );

    return (
        <div className={style.dependenciesInfo}>
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
            ) : dependencies ? (
                <DependenciesInfoResult
                    dependencies={dependencies}
                    type={type}
                />
            ) : (
                <div className={style.loader}>
                    <Loader size={'xlarge'} />
                    <BodyShort>{'Laster avhengigheter...'}</BodyShort>
                </div>
            )}
        </div>
    );
};
