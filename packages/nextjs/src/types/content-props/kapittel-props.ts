import {
    ContentType,
    ContentProps,
    ContentAndMediaCommonProps,
    ContentCommonProps,
} from './_content-common';
import { ArtikkelProps } from './artikkel-props';

export type KapittelData = Partial<{
    article: ArtikkelProps;
}>;

export type KapittelNavigasjonData = {
    data: {
        article: ArtikkelProps;
    };
} & ContentAndMediaCommonProps;

type ParentProps = {
    data?: {
        chapters?: KapittelNavigasjonData[];
    };
} & ContentProps;

export type KapittelProps = ContentCommonProps & {
    type: ContentType.Kapittel;
    parent: ParentProps;
    data: KapittelData;
};
