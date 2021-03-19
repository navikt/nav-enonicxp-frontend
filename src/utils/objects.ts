// Get a nested object value from an array of keys
export const getNestedValueFromKeyArray = (obj: object, keys: string[]) => {
    if (!keys || keys.length === 0 || !obj || typeof obj !== 'object') {
        return null;
    }

    if (keys.length === 1) {
        return obj[keys[0]];
    }

    const subObj = obj[keys[0]];

    return getNestedValueFromKeyArray(subObj, keys.slice(1));
};

// Get a nested object value from a dot-delimited string of keys
export const getNestedValueFromKeyString = (
    obj: object,
    keysString: string
) => {
    return getNestedValueFromKeyArray(obj, keysString?.split?.('.'));
};
