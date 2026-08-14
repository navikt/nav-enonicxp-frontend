import { IFuseOptions } from 'fuse.js';

const defaultOptions: IFuseOptions<unknown> = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    ignoreLocation: true,
    useTokenSearch: true,
    threshold: 0.1,
};

export const getFuseSearchFunc = async <Type>(
    list: Type[],
    options?: IFuseOptions<Type>,
    maxScore = 0.35
) => {
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(list, { ...defaultOptions, ...options });

    return (textInput: string) => {
        if (!textInput) {
            return list;
        }
        console.log(`Searching for "${textInput}" in list: ${JSON.stringify(list)}`);

        const results = fuse.search(textInput);

        return results.reduce<Type[]>((acc, result) => {
            if (result.score !== undefined && result.score < maxScore) {
                acc.push(result.item);
            } else {
                console.log('ekskludert', JSON.stringify(result.item), 'score', result.score);
            }

            return acc;
        }, []);
    };
};
