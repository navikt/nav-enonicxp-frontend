import type Fuse from 'fuse.js';

const defaultOptions: Fuse.IFuseOptions<unknown> = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    distance: 250,
    threshold: 0.25,
};

export const getFuseSearchFunc = async <Type>(
    list: Type[],
    options?: Fuse.IFuseOptions<Type>
) => {
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(list, { ...defaultOptions, ...options });

    return (textInput: string) =>
        textInput ? fuse.search(textInput).map((result) => result.item) : list;
};
