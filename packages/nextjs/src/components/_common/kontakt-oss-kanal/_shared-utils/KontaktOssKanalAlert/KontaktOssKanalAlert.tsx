import { Alert } from '@navikt/ds-react';
import alertStyle from './KontaktOssKanalAlert.module.scss';

interface Props {
    alertText: string;
}

export const KontaktOssKanalAlert = ({ alertText }: Props) => {
    return (
        <Alert variant="warning" inline className={alertStyle.alert}>
            {alertText}
        </Alert>
    );
};
