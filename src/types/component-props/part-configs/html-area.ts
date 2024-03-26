import { ExpandableMixin, FiltersMixin } from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type PartConfigHtmlArea = {
    html: ProcessedHtmlProps;
} & ExpandableMixin &
    FiltersMixin;
