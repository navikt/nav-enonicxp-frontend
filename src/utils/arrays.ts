export const removeDuplicates = <Type>(
    array: Type[],
    isEqualPredicate?: (a: Type, b: Type) => boolean
) =>
    isEqualPredicate
        ? array.filter((aItem, aIndex) => {
              const bIndex = array.findIndex((bItem) =>
                  isEqualPredicate(aItem, bItem)
              );
              return aIndex === bIndex;
          })
        : array.filter((item, index) => array.indexOf(item) === index);

export const forceArray = <Type>(arrayOrNot?: Type | Type[]) => {
    if (arrayOrNot === undefined || arrayOrNot === null) {
        return [];
    }

    return Array.isArray(arrayOrNot) ? arrayOrNot : [arrayOrNot];
};
