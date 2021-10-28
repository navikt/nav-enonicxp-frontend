import { ContentProps, ContentType } from './_content-common';

export type GlobalValueItem = {
    key: string;
    itemName: string;
    numberValue?: string | number;
};

export type GlobalValuesData = {
    valueItems?: GlobalValueItem[];
};

export interface GlobalValuesProps extends ContentProps {
    __typename: ContentType.GlobalValues;
    data: GlobalValuesData;
}
