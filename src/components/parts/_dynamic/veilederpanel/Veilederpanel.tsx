import React from 'react';
import { DynamicSupervisorPanel } from 'types/component-props/parts/supervisor-panel';
import VeilederPanelModul from 'nav-frontend-veilederpanel';
import { Veileder } from './Veileder';
import { ParsedHtml } from '../../../ParsedHtml';
import './Veilederpanel.less';

const Veilederpanel = (props: DynamicSupervisorPanel) => {
    if (!props.config) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { content, margin } = props.config;
    const style = {
        ...(margin && {
            margin: margin,
        }),
    };

    return (
        <div className={'nav-veilederpanel__container'} style={style}>
            <VeilederPanelModul svg={<Veileder />}>
                <ParsedHtml content={content} />
            </VeilederPanelModul>
        </div>
    );
};

export default Veilederpanel;
