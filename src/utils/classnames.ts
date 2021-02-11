export const BEM = (block: string) => (element?: string, mod?: string) =>
    `${block}${element ? `__${element}` : ''}${mod ? `--${mod}` : ''}`;

export const classNames = (...classNames: string[]) =>
    classNames
        .reduce(
            (acc, className) =>
                typeof className === 'string' ? `${acc} ${className}` : acc,
            ''
        )
        .trim();
