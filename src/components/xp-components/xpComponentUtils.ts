import { ComponentProps } from 'types/component-props/_component-common';

export const getXpComponentEditorAttribs = ({ type, path }: ComponentProps) => ({
    'data-portal-component-type': type,
    'data-portal-component': path,
});
