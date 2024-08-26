import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { Header } from 'components/_common/headers/Header';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import { ClusterState } from 'components/_editor-only/site-info/types';

import style from './SiteInfoHeader.module.scss';

type AlertboxVariant = React.ComponentProps<typeof AlertBox>['variant'];

const clusterStateToVariant: Record<ClusterState, AlertboxVariant> = {
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
                <Header level={'1'}>{'nav.no cms status'}</Header>
            </div>
            {clusterState ? (
                <AlertBox
                    variant={clusterStateToVariant[clusterState]}
                    inline={true}
                    className={style.serverInfo}
                >
                    <BodyShort>{`Cluster status: ${clusterState}`}</BodyShort>
                    <BodyShort>{`Server: ${serverName}`}</BodyShort>
                </AlertBox>
            ) : (
                <BodyShort>{'Could not determine cluster state!'}</BodyShort>
            )}
        </div>
    );
};
