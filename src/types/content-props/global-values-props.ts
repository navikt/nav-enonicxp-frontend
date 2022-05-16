import { ContentProps, ContentType } from './_content-common';

export type CaseProcessingTimeUnit = 'days' | 'weeks' | 'months';

type ValueItemCommon = {
    key: string;
    itemName: string;
    type: string;
};

export type CaseProcessingTimeItem = ValueItemCommon & {
    value: string | number;
    unit: CaseProcessingTimeUnit;
    type: 'caseTime';
};

export type GlobalNumberValueItem = ValueItemCommon & {
    numberValue?: string | number;
    type: 'numberValue';
};

export type GlobalValueItem = GlobalNumberValueItem | CaseProcessingTimeItem;

export type CaseProcessingTimeSetData = {
    valueItems?: CaseProcessingTimeItem[];
};

export type GlobalValuesData = {
    valueItems?: GlobalNumberValueItem[];
};

export type CaseProcessingTimeSetProps = ContentProps & {
    __typename: ContentType.CaseProcessingTimeSet;
    data: CaseProcessingTimeSetData;
};

export type GlobalNumberValuesSetProps = ContentProps & {
    __typename: ContentType.GlobalValues;
    data: GlobalValuesData;
};

export type GlobalValuesProps = ContentProps &
    (GlobalNumberValuesSetProps | CaseProcessingTimeSetProps);
