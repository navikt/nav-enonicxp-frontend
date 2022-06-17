import React from 'react';
import { AreapageSituationCardPartProps } from '../../../types/component-props/parts/areapage-situation-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LargeCard } from '../../_common/card/LargeCard';
import { getCardProps } from '../../_common/card/card-utils';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

import style from './AreapageSituationCardPart.module.scss';

export const AreapageSituationCardPart = ({
    config,
}: AreapageSituationCardPartProps) => {
    const { pageConfig, language } = usePageConfig();
    const { editorView } = pageConfig;

    if (!config?.target) {
        return <EditorHelp text={'Komponenten er ikke konfigurert'} />;
    }

    const { target, disabled } = config;

    if (disabled) {
        return (
            <EditorHelp
                type={'info'}
                text={`Situasjonen ${target.data.title} er skjult på denne siden`}
            />
        );
    }

    const props = getCardProps(target, language);

    // Using product card as placeholder for now
    return (
        <div className={style.card}>
            <LargeCard {...props} />
        </div>
    );
};
