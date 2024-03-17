import { ExpandableMixin, FiltersMixin } from '../_mixins';
import { ProcessedHtmlProps } from '../../processed-html-props';

export type PartConfigHtmlArea = {
    html: ProcessedHtmlProps;
} & ExpandableMixin &
    FiltersMixin;
