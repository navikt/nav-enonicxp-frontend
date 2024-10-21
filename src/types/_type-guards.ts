import { ContentProps } from './content-props/_content-common';

export const isPropsWithContent = (props: any): props is { content: ContentProps } => {
    return !!props?.content;
};

export const createTypeGuard = <Type>(allowedValues: ReadonlyArray<Type>) => {
    const allowedValuesSet: ReadonlySet<Type> = new Set(allowedValues);

    const isAllowedValue = (value: unknown): value is Type => allowedValuesSet.has(value as Type);

    return isAllowedValue;
};
