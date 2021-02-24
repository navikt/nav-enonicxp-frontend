import React from 'react';
import { Header } from '../header/Header';
import { TypoStyle } from '../../../types/typo-style';
import { HeaderCommonConfig } from '../../../types/component-props/_mixins';
import './SectionHeader.less';

type Props = {
    text: string;
    justify?: HeaderCommonConfig['justify'];
    anchorId?: string;
};

export const SectionHeader = ({ text, anchorId, justify }: Props) => {
    return text ? (
        <Header
            typoStyle={TypoStyle.Innholdstittel}
            tag={'h2'}
            text={text}
            anchorId={anchorId}
            justify={justify}
            className={'section-header'}
        />
    ) : null;
};
