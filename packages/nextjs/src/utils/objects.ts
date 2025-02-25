const isRecord = (obj: unknown): obj is Record<string, unknown> =>
    !!(obj && typeof obj === 'object' && !Array.isArray(obj));

// Get a nested object value from an array of keys
export const getNestedValueFromKeyArray = (obj: unknown, keys: string[]): unknown => {
    if (keys.length === 0 || !isRecord(obj)) {
        return null;
    }

    const [currentKey, ...rest] = keys;
    const currentValue = obj[currentKey];

    if (rest.length === 0) {
        return currentValue;
    }

    return getNestedValueFromKeyArray(currentValue, rest);
};

// Get a nested object value from a dot-delimited string of keys
export const getNestedValueFromKeyString = (obj: Record<string, any>, keysString: string) => {
    return getNestedValueFromKeyArray(obj, keysString.split('.'));
};
