import Fuse from 'fuse.js';
import IFuseOptions = Fuse.IFuseOptions;

const defaultOptions: IFuseOptions<unknown> = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    distance: 250,
    threshold: 0.25,
};

export const getFuseSearchFunc = <Type>(
    list: Type[],
    options?: IFuseOptions<Type>
) => {
    const fuse = new Fuse(list, { ...defaultOptions, ...options });

    return (textInput: string) =>
        textInput ? fuse.search(textInput).map((result) => result.item) : list;
};
