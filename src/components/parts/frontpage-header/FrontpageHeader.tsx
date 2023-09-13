import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { FrontpageHeaderProps } from 'types/component-props/parts/frontpage-header';
import { classNames } from 'utils/classnames';
import { getAudience } from 'types/component-props/_mixins';

import style from './FrontpageHeader.module.scss';

export const FrontpageHeader = ({
    config,
    pageProps,
}: FrontpageHeaderProps) => {
    const { title, bgColor } = config;

    if (!title) {
        return <EditorHelp text={'Mangler tittel'} />;
    }

    const audience = getAudience(pageProps.data.audience);

    return (
        <div
            className={classNames(style.wrapper, style[audience])}
            style={
                {
                    '--bg-color': bgColor,
                } as React.CSSProperties
            }
        >
            <Header
                size="xlarge"
                level="1"
                justify="left"
                className={style.header}
            >
                {title}
            </Header>
        </div>
    );
};
