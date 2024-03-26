import { HeadingTag } from 'types/typo-style';
import { HeaderCommonConfig } from 'types/component-props/_mixins';

export type PartConfigHeader = {
    title: string;
    anchorId: string;
    titleTag: HeadingTag;
} & HeaderCommonConfig;
