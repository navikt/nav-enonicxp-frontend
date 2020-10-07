import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { DynamicAlert } from '../../../../types/content-types/_dynamic/alert';
import htmlReactParser from 'html-react-parser';
import './Alerstripe.less';

const Alerstripe = (props: DynamicAlert) => {
    const no_nav_navno = props?.part?.config?.no_nav_navno;

    if (!no_nav_navno) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { dynamic_alert } = no_nav_navno;
    const { content, type, margin } = dynamic_alert;
    const style = {
        ...(margin && {
            margin: margin,
        }),
    };

    return (
        <AlertStripe type={type} style={style}>
            {content && htmlReactParser(content)}
        </AlertStripe>
    );
};

export default Alerstripe;
