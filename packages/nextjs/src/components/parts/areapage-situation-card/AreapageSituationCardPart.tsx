import React from 'react';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { getCardProps } from 'components/_common/card/card-utils';
import { LargeCardV1 } from 'components/_common/card/LargeCardV1/LargeCardV1';
import { usePageContentProps } from 'store/pageContext';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';

import style from './AreapageSituationCardPart.module.scss';

export type PartConfigAreapageSituationCard = {
    disabled: boolean;
    target: SituationPageProps;
};

export const AreapageSituationCardPart = ({
    config,
}: PartComponentProps<PartType.AreapageSituationCard>) => {
    const pageProps = usePageContentProps();
    if (!config?.target?._id) {
        return <EditorHelp type={'error'} text={'Feil: komponenten har ingen gyldig referanse'} />;
    }

    const { target, disabled } = config;
    const cardProps = getCardProps(target, pageProps);

    if (!cardProps) {
        return <EditorHelp type={'error'} text={'Feil: mangler lenkedata'} />;
    }

    const getSituationLabel = translator('situations', pageProps.language);

    return (
        <div className={classNames(style.card, disabled && style.disabled)}>
            {disabled && (
                <span className={style.disabledMsg}>
                    <strong>{`"${target.data.title || target.displayName}"`}</strong>
                    {' er skjult på denne siden'}
                </span>
            )}
            <LargeCardV1 {...cardProps} tagline={getSituationLabel('person')} />
        </div>
    );
};
