import React from 'react';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { AreapageSituationCardPartProps } from 'types/component-props/parts/areapage-situation-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { getCardProps } from '../../_common/card/card-utils';
import { LargeCard } from '../../_common/card/LargeCard';
import { usePageContentProps } from 'store/pageContext';

import style from './AreapageSituationCardPart.module.scss';

export const AreapageSituationCardPart = ({
    config,
}: AreapageSituationCardPartProps) => {
    const pageContext = usePageContentProps();
    if (!config?.target?._id) {
        return (
            <EditorHelp
                type={'error'}
                text={'Feil: komponenten har ingen gyldig referanse'}
            />
        );
    }

    const { target, disabled } = config;
    const cardProps = getCardProps(target, pageContext);

    if (!cardProps) {
        return <EditorHelp type={'error'} text={'Feil: mangler lenkedata'} />;
    }

    const getSituationLabel = translator('situations', pageContext.language);

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
