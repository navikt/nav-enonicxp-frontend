export type MacroProps = {
    ref: string;
    name: string;
    descriptor: string;
    config: {
        [key in MacroProps['name']]: any;
    };
};

export type ProcessedHtmlProps = {
    processedHtml: string;
    macros: MacroProps[];
};
