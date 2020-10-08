import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { DynamicAlert } from 'types/content-types/_dynamic/alert';
import { ParsedHtml } from '../ParsedHtml';
import './Alerstripe.less';

const Alerstripe = (props: DynamicAlert) => {
    const no_nav_navno = props?.part?.config?.no_nav_navno;

    if (!no_nav_navno) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { dynamic_alert } = no_nav_navno;
    const { content, type, inline, margin } = dynamic_alert;
    const style = {
        ...(margin && {
            margin: margin,
        }),
    };

    return (
        <AlertStripe
            type={type || 'info'}
            form={inline === 'true' ? 'inline' : undefined}
            style={style}
        >
            <ParsedHtml content={content} />
        </AlertStripe>
    );
};

export default Alerstripe;
