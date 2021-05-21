import React from 'react';
import { DynamicReadMorePanel } from 'types/component-props/parts/read-more-panel';
import LesmerpanelModul from 'nav-frontend-lesmerpanel';
import { ParsedHtml } from '../../../ParsedHtml';
import './LesMerPanel.less';

const LesMerPanel = (props: DynamicReadMorePanel) => {
    if (!props.config) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { content, ingress, margin, border } = props.config;
    const style = {
        ...(margin && {
            margin: margin,
        }),
    };

    return (
        <div className={'lesMerPanel__container'} style={style}>
            <LesmerpanelModul
                border={border === 'true'}
                intro={<ParsedHtml {...ingress} />}
            >
                <ParsedHtml {...content} />
            </LesmerpanelModul>
        </div>
    );
};

export default LesMerPanel;
