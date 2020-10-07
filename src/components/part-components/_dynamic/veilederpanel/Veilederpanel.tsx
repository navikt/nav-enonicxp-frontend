import React from 'react';
import { DynamicSupervisorPanel } from '../../../../types/content-types/_dynamic/supervisor-panel';
import VeilederPanelModul from 'nav-frontend-veilederpanel';
import { Veileder } from './Veileder';
import { ParsedHtml } from '../ParsedHtml';
import './Veilederpanel.less';

const Veilederpanel = (props: DynamicSupervisorPanel) => {
    const no_nav_navno = props?.part?.config?.no_nav_navno;

    if (!no_nav_navno) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { dynamic_supervisor_panel } = no_nav_navno;
    const { content, margin } = dynamic_supervisor_panel;
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
