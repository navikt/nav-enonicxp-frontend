import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { SituationPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { PreviewWarning } from 'components/_common/previewWarning/PreviewWarning';
import { BEM } from '../../../utils/classnames';

const bem = BEM('situation-page');

export const SituationPage = (props: SituationPageProps) => {
    return (
        <div className={bem()}>
            <PreviewWarning />
            <ThemedPageHeader contentProps={props} />
            <div className={bem('content')}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
