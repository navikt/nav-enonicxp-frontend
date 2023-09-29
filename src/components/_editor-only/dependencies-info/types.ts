import { ContentType } from 'types/content-props/_content-common';

export type DependenciesInfoSupportedContentType =
    | ContentType.Fragment
    | ContentType.ProductDetails
    | ContentType.Video;

export type DependencyType = 'general' | 'macros' | 'components';

export type DependenciesData = {
    [key in DependencyType]?: DependencyData[];
};

export type DependencyData = {
    name: string;
    path: string;
    id: string;
    editorPath?: string;
};
