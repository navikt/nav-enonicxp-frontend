import { ContentProps, ContentType } from './_content-common';

export type GlobalValueItem = {
    key: string;
    itemName: string;
    textValue: string;
    numberValue?: number;
};

export type GlobalValuesData = {
    valueItems?: GlobalValueItem[];
};

export interface GlobalValuesProps extends ContentProps {
    __typename: ContentType.GlobalValues;
    data: GlobalValuesData;
}
