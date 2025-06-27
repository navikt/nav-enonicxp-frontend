import { Alert } from '@navikt/ds-react';
import alertStyle from './ContactOptionAlert.module.scss';

interface Props {
    alertText: string;
}

export const ContactOptionAlert = ({ alertText }: Props) => {
    return (
        <Alert variant="warning" inline className={alertStyle.alert}>
            {alertText}
        </Alert>
    );
};
