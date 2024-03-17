import { HeadingTag } from '../../typo-style';
import { HeaderCommonConfig } from '../_mixins';

export type PartConfigHeader = {
    title: string;
    anchorId: string;
    titleTag: HeadingTag;
} & HeaderCommonConfig;
