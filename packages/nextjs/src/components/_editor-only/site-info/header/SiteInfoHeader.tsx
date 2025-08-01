import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { Heading } from 'components/_common/headers/Heading';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
import { ClusterState } from 'components/_editor-only/site-info/types';
import style from './SiteInfoHeader.module.scss';

type VarselboksVariant = React.ComponentProps<typeof Varselboks>['variant'];

const clusterStateToVariant: Record<ClusterState, VarselboksVariant> = {
    GREEN: 'success',
    YELLOW: 'warning',
    RED: 'error',
} as const;

type Props = {
    serverName: string;
    clusterState?: ClusterState;
};

export const SiteInfoHeader = ({ serverName, clusterState }: Props) => {
    return (
        <div className={style.container}>
            <div>
                <Heading level={'1'}>{'nav.no cms status'}</Heading>
            </div>
            {clusterState ? (
                <Varselboks
                    variant={clusterStateToVariant[clusterState]}
                    inline={true}
                    className={style.serverInfo}
                >
                    <BodyShort>{`Cluster status: ${clusterState}`}</BodyShort>
                    <BodyShort>{`Server: ${serverName}`}</BodyShort>
                </Varselboks>
            ) : (
                <BodyShort>{'Could not determine cluster state!'}</BodyShort>
            )}
        </div>
    );
};
