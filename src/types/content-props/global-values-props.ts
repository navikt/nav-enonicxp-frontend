import { ContentProps, ContentType } from './_content-common';

export type GlobalCaseTimeUnit = 'days' | 'weeks' | 'months';

type GlobalValueItemCommon = {
    key: string;
    itemName: string;
    type: string;
};

export type GlobalCaseTimeSetItem = GlobalValueItemCommon & {
    value: string | number;
    unit: GlobalCaseTimeUnit;
    type: 'caseTime';
};

export type GlobalNumberValueItem = GlobalValueItemCommon & {
    numberValue?: string | number;
    type: 'numberValue';
};

export type GlobalValueItem = GlobalNumberValueItem | GlobalCaseTimeSetItem;

export type GlobalCaseTimeSetData = {
    valueItems?: GlobalCaseTimeSetItem[];
};

export type GlobalValuesData = {
    valueItems?: GlobalNumberValueItem[];
};

export type GlobalCaseTimeSetProps = ContentProps & {
    __typename: ContentType.GlobalCaseTimeSet;
    data: GlobalCaseTimeSetData;
};

export type GlobalNumberValuesSetProps = ContentProps & {
    __typename: ContentType.GlobalNumberValuesSet;
    data: GlobalValuesData;
};

export type GlobalValuesProps = ContentProps &
    (GlobalNumberValuesSetProps | GlobalCaseTimeSetProps);
