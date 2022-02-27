import React from 'react';
import { Header } from '../../../_common/headers/Header';
import { ClusterState } from '../SiteInfo';
import style from './SiteInfoHeader.module.scss';
import { AlertBox } from '../../../_common/alert-box/AlertBox';
import { BodyShort } from '@navikt/ds-react';

type AlertboxVariant = React.ComponentProps<typeof AlertBox>['variant'];

const clusterStateToVariant: {
    [clusterState in ClusterState]: AlertboxVariant;
} = {
    GREEN: 'success',
    YELLOW: 'warning',
    RED: 'error',
};

type Props = {
    headerText: string;
    serverName: string;
    clusterState: ClusterState;
};

export const SiteInfoHeader = ({
    headerText,
    serverName,
    clusterState,
}: Props) => {
    return (
        <div className={style.siteInfoHeader}>
            <Header level={'1'} justify={'left'}>
                {headerText}
            </Header>
            <AlertBox
                variant={clusterStateToVariant[clusterState]}
                inline={true}
                className={style.serverInfo}
            >
                <BodyShort>{`Cluster status: ${clusterState}`}</BodyShort>
                <BodyShort>{`Current server: ${serverName}`}</BodyShort>
            </AlertBox>
        </div>
    );
};
