import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

import style from './FrontpageContactUs.module.scss';

export const FrontpageContactPart = ({
    config,
}: FrontpageContanctPartProps) => {
    if (!config) {
        return <EditorHelp text={'Komponenten er ikke konfigerert'} />;
    }

    const { chatTitle, chatIngress, contactUsTitle, contactUsIngress } = config;

    return <div className={style.container}></div>;
};
