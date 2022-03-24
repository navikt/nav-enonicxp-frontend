import { Alert } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';

import style from './PreviewWarning.module.scss';

export const PreviewWarning = () => {
    const { language, pageConfig } = usePageConfig();
    const getDraftLabels = translator('draft', language);
    const { isPagePreview } = pageConfig;

    return isPagePreview ? (
        <div className={style.previewWarning}>
            <Alert variant="warning" size="small">
                {getDraftLabels('warningText')}
            </Alert>
        </div>
    ) : null;
};
