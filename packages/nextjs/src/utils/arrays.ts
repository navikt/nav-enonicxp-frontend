export const removeDuplicates = <Type>(
    array: Type[],
    isEqualPredicate?: (a: Type, b: Type) => boolean
) =>
    isEqualPredicate
        ? array.filter((aItem, aIndex) => {
              const bIndex = array.findIndex((bItem) => isEqualPredicate(aItem, bItem));
              return aIndex === bIndex;
          })
        : array.filter((item, index) => array.indexOf(item) === index);

export const forceArray = <Type>(arrayOrNot?: Type | Type[]) => {
    if (arrayOrNot === undefined || arrayOrNot === null) {
        return [];
    }

    return Array.isArray(arrayOrNot) ? arrayOrNot : [arrayOrNot];
};

export const sortLikeArray =
    <Type>(sortedArray: Type[]) =>
    (a: Type, b: Type) =>
        sortedArray.indexOf(a) - sortedArray.indexOf(b);

export const getFirstElementIfArray = <Type>(maybeArray: Type | Type[]) => {
    return Array.isArray(maybeArray) ? maybeArray[0] : maybeArray;
};
