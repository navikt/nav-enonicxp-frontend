import React from 'react';
import { AreapageSituationCardPartProps } from '../../../types/component-props/parts/areapage-situation-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LargeCard } from '../../_common/card/LargeCard';
import { getCardProps } from '../../_common/card/card-utils';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import classNames from 'classnames';

import style from './AreapageSituationCardPart.module.scss';

export const AreapageSituationCardPart = ({
    config,
}: AreapageSituationCardPartProps) => {
    const { language } = usePageConfig();
    if (!config?.target) {
        return <EditorHelp text={'Komponenten er ikke konfigurert'} />;
    }

    const { target, disabled } = config;

    const props = getCardProps(target, language);

    // Using product card as placeholder for now
    return (
        <div className={classNames(style.card, disabled && style.disabled)}>
            {disabled && (
                <span className={style.disabledMsg}>
                    <strong>{`"${target.data.title}"`}</strong>
                    {' er skjult på denne siden'}
                </span>
            )}
            <LargeCard {...props} />
        </div>
    );
};
