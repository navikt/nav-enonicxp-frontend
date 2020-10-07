import React from 'react';
import { DynamicText } from 'types/content-types/_dynamic/text';
import { parseHtml } from 'components/page-components/legacy-page/LegacyPage';

export const Text = ({ text }: DynamicText) => {
    const value = text.value;
    return <div className={'typo-normal'}>{value && parseHtml(value)}</div>;
};
