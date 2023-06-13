import type Fuse from 'fuse.js';

const defaultOptions: Fuse.IFuseOptions<unknown> = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    ignoreLocation: true,
    distance: 250,
    threshold: 0.15,
};

export const getFuseSearchFunc = async <Type>(
    list: Type[],
    options?: Fuse.IFuseOptions<Type>,
    maxScore = 0.01
) => {
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(list, { ...defaultOptions, ...options });

    return (textInput: string) =>
        textInput
            ? fuse.search(textInput).reduce<Type[]>((acc, result) => {
                  if (result.score < maxScore) {
                      acc.push(result.item);
                  }

                  return acc;
              }, [])
            : list;
};
