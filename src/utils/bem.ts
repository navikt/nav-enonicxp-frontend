export const BEM = (block: string) => (element?: string, mod?: string) =>
    `${block}${element ? `__${element}` : ''}${mod ? `--${mod}` : ''}`;
