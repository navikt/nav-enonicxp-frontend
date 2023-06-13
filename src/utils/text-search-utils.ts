import type Fuse from 'fuse.js';

const defaultOptions: Fuse.IFuseOptions<unknown> = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    ignoreLocation: true,
    threshold: 0.1,
};

export const getFuseSearchFunc = async <Type>(
    list: Type[],
    options?: Fuse.IFuseOptions<Type>,
    maxScore = 0.025
) => {
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(list, { ...defaultOptions, ...options });

    return (textInput: string) => {
        if (!textInput) {
            return list;
        }

        const results = fuse.search(textInput);

        return results.reduce<Type[]>((acc, result) => {
            if (result.score < maxScore) {
                acc.push(result.item);
            }

            return acc;
        }, []);
    };
};
