import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { DynamicAlert } from 'types/component-props/parts/alert';
import { ParsedHtml } from '../../../ParsedHtml';
import './Alert.less';

const Alert = (props: DynamicAlert) => {
    const { config } = props;

    if (!config) {
        return <h2>Tomt veilederpanel</h2>;
    }

    const { content, type, inline, margin } = config;
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
            <ParsedHtml htmlProps={content} />
        </AlertStripe>
    );
};

export default Alert;
