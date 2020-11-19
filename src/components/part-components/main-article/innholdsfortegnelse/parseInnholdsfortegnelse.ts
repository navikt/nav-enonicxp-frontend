import htmlReactParser from 'html-react-parser';



export const parseInnholdsfortegnelse = (htmlText: string, hasTableOfContents: boolean) => {

    if (!hasTableOfContents) {
        return [];
    }

    const parsedHtml = htmlReactParser(htmlText) as JSX.Element[];
    const innholdsfortegnelse = parsedHtml
        .filter((el) => el.type === 'h3')
        .map((el) => el.props?.children);

    return innholdsfortegnelse;
}
