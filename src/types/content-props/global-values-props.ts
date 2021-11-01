import { ContentProps, ContentType } from './_content-common';

export type GlobalValueItem = {
    numberValue?: string | number;
};

export type GlobalValuesData = {
    valueItems?: GlobalValueItem;
    valueUsage: GlobalValuesUsage[];
};

export type GlobalValuesUsage = {
    id: string;
    path: string;
    displayName: string;
};

export interface GlobalValuesProps extends ContentProps {
    __typename: ContentType.GlobalValues;
    data: GlobalValuesData;
}
