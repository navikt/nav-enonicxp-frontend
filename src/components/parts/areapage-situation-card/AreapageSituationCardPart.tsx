import React from 'react';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { getCardProps } from '../../_common/card/card-utils';
import { LargeCard } from '../../_common/card/LargeCard';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { PartComponent, PartType } from '../../../types/component-props/parts';

import style from './AreapageSituationCardPart.module.scss';

export const AreapageSituationCardPart: PartComponent<
    PartType.AreapageSituationCard
> = ({ config }) => {
    const pageConfig = usePageConfig();
    if (!config?.target?._id) {
        return (
            <EditorHelp
                type={'error'}
                text={'Feil: komponenten har ingen gyldig referanse'}
            />
        );
    }

    const { target, disabled } = config;
    const cardProps = getCardProps(target, pageConfig);

    if (!cardProps) {
        return <EditorHelp type={'error'} text={'Feil: mangler lenkedata'} />;
    }

    const getSituationLabel = translator('situations', pageConfig.language);

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
            <LargeCard {...cardProps} category={getSituationLabel('person')} />
        </div>
    );
};
