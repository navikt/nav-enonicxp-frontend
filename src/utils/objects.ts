// Get a nested object value from an array of keys
export const getNestedValueFromKeyArray = (obj: object, keys: string[]) => {
    if (!keys || keys.length === 0 || !obj || typeof obj !== 'object') {
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
export const getNestedValueFromKeyString = (
    obj: object,
    keysString: string
) => {
    return getNestedValueFromKeyArray(obj, keysString?.split?.('.'));
};

export const getDeepObjectKey = (object, key) => {
    const results = [];

    if (!object || typeof object === 'string') {
        return results;
    }

    Object.keys(object).forEach((objectKey) => {
        if (objectKey === key) {
            results.push(object[key]);
        } else {
            results.push(getDeepObjectKey(object[objectKey], key));
        }
    });

    return results.flat();
};
