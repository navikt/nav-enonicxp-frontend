import React from 'react';
import htmlReactParser from 'html-react-parser';
import { DynamicReadMorePanel } from '../../../../types/content-types/_dynamic/read-more-panel';
import LesmerpanelModul from 'nav-frontend-lesmerpanel';
import './LesMerPanel.less';

const LesMerPanel = (props: DynamicReadMorePanel) => {
    const no_nav_navno = props?.part?.config?.no_nav_navno;

    if (!no_nav_navno) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { dynamic_read_more_panel } = no_nav_navno;
    const { content, ingress, margin, border } = dynamic_read_more_panel;
    const style = {
        ...(margin && {
            margin: margin,
        }),
    };

    return (
        <div className={'lesMerPanel__container'} style={style}>
            <LesmerpanelModul
                border={border === 'true'}
                intro={<span>{ingress && htmlReactParser(ingress)}</span>}
            >
                {content && htmlReactParser(content)}
            </LesmerpanelModul>
        </div>
    );
};

export default LesMerPanel;
