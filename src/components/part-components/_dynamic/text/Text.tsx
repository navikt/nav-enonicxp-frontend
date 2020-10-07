import React from 'react';
import htmlReactParser from 'html-react-parser';
import { DynamicText } from '../../../../types/content-types/_dynamic/text';

export const Text = ({ text }: DynamicText) => {
    const value = text.value;
    return <>{value && htmlReactParser(value)}</>;
};
