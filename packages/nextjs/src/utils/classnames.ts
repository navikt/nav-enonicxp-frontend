export const BEM = (block: string) => (element?: string, mod?: string) =>
    `${block}${element ? `__${element}` : ''}${mod ? `--${mod}` : ''}`;

export const classNames = (...classNames: unknown[]) =>
    classNames
        .reduce<string>(
            (acc, className) => (typeof className === 'string' ? `${acc} ${className}` : acc),
            ''
        )
        .trim();
