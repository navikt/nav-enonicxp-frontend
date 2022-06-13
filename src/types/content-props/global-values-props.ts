import { ContentType, CustomContentCommonProps } from './_content-common';

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

export type GlobalCaseTimeSetProps = CustomContentCommonProps & {
    __typename: ContentType.GlobalCaseTimeSet;
    data: GlobalCaseTimeSetData;
};

export type GlobalNumberValuesSetProps = CustomContentCommonProps & {
    __typename: ContentType.GlobalNumberValuesSet;
    data: GlobalValuesData;
};

export type GlobalValuesProps = CustomContentCommonProps &
    (GlobalNumberValuesSetProps | GlobalCaseTimeSetProps);
