import React from 'react';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { getCardProps } from 'components/_common/card/card-utils';
import { LargeCardV1 } from 'components/_common/card/LargeCardV1/LargeCardV1';
import { usePageContentProps } from 'store/pageContext';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';

import style from './SituasjonskortPart.module.scss';

export type PartConfigSituasjonskort = {
    disabled: boolean;
    target: Pick<
        SituationPageProps,
        '_id' | 'data' | 'displayName' | 'type' | 'language' | '_path'
    >;
};

export const SituasjonskortPart = ({ config }: PartComponentProps<PartType.Situasjonskort>) => {
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
        <div className={classNames(style.kort, disabled && style.disabled)}>
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
