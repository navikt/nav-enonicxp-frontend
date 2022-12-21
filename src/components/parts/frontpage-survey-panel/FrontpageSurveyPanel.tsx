import React from 'react';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

import { FrontpageSurveyPanel as FrontPageSurveyPanelProps } from 'types/component-props/parts/frontpage-survey-panel';
import { Heading } from '@navikt/ds-react';
import { XpImage } from 'components/_common/image/XpImage';

import style from './FrontpageSurveyPanel.module.scss';

export const FrontpageSurveyPanel = ({ config }: FrontPageSurveyPanelProps) => {
    if (!config?.description) {
        return (
            <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />
        );
    }

    const { description, header, icon } = config;
    return (
        <div className={style.surveyPanel}>
            {header && (
                <Heading level="2" size="large" className={style.header}>
                    {header}
                </Heading>
            )}
            <div className={style.container}>
                {icon?.icon && (
                    <div className={style.icon}>
                        <XpImage
                            imageProps={icon?.icon}
                            alt={''}
                            style={{
                                ...(icon.size && {
                                    height: `${icon.size}%`,
                                    width: `${icon.size}%`,
                                }),
                            }}
                        />
                    </div>
                )}
                <div className={style.description}>
                    <ParsedHtml htmlProps={description} />
                </div>
            </div>
        </div>
    );
};
