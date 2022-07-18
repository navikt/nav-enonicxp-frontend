import React from 'react';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';

import { AreapageSituationCardPartProps } from '../../../types/component-props/parts/areapage-situation-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { getCardProps } from '../../_common/card/card-utils';
import { LargeCard } from '../../_common/card/LargeCard';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

import style from './AreapageSituationCardPart.module.scss';

export const AreapageSituationCardPart = ({
    config,
}: AreapageSituationCardPartProps) => {
    const { language } = usePageConfig();
    if (!config?.target?._id) {
        return (
            <EditorHelp
                type={'error'}
                text={'Feil: komponenten har ingen gyldig referanse'}
            />
        );
    }

    const { target, disabled } = config;

    const props = getCardProps(target, language);
    const getSituationLabel = translator('situations', language);

    return (
        <div className={classNames(style.card, disabled && style.disabled)}>
            {disabled && (
                <span className={style.disabledMsg}>
                    <strong>{`"${
                        target.data.title || target.displayName
                    }"`}</strong>
                    {' er skjult på denne siden'}
                </span>
            )}
            <LargeCard {...props} category={getSituationLabel('person')} />
        </div>
    );
};
