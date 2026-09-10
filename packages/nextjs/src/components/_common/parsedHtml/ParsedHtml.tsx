import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { isTag, isText } from 'domhandler';
import htmlReactParser, {
    Element,
    domToReact,
    attributesToProps,
    DOMNode,
    HTMLReactParserOptions,
} from 'html-react-parser';
import { BodyLong, Heading } from '@navikt/ds-react';
import { store } from 'store/store';
import { usePageContentProps } from 'store/pageContext';
import { NextImage } from 'components/_common/image/NextImage';
import { getMediaUrl } from 'utils/urls';
import { processedHtmlMacroTag, ProcessedHtmlProps } from 'types/processed-html-props';
import { headingToLevel, headingToSize, isHeadingTag } from 'types/typo-style';
import { MacroType } from 'types/macro-props/_macros-common';
import { MacroMapper } from 'components/macros/MacroMapper';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { Table } from 'components/_common/table/Table';
import { forceArray } from 'utils/arrays';

const blockLevelMacros: ReadonlySet<string> = new Set([
    MacroType.Infokort,
    MacroType.HeaderWithAnchor,
    MacroType.HtmlFragment,
    MacroType.InfoBoks,
    MacroType.Ingress,
    MacroType.ProductCardMini,
    MacroType.ProductCardMicro,
    MacroType.Quote,
    MacroType.VarselBoksDeprecated,
    MacroType.Video,
    MacroType.Skjemadetaljer,
]);

const isBlockLevelMacro = (node: DOMNode): node is Element =>
    isTag(node) &&
    node.name === processedHtmlMacroTag &&
    blockLevelMacros.has(node.attribs?.['data-macro-name']);

const hasBlockLevelMacroChildren = (element: Element) => {
    return element.children?.some((child) => isBlockLevelMacro(child as DOMNode));
};

const isEmptyNode = (child: DOMNode): boolean => {
    if (isTag(child)) {
        // Macros and image tags are allowed to be empty
        if (child.name === processedHtmlMacroTag || (child.name === 'img' && child.attribs?.src)) {
            return false;
        }

        return getNonEmptyChildren(child).length === 0;
    }

    if (isText(child)) {
        const stringData = child.data?.replace?.(/&nbsp;/g, ' ').trim();
        return !stringData;
    }

    return false;
};

const getNonEmptyChildren = ({ children }: Element): Element['children'] => {
    if (!children) {
        return [];
    }

    return children.filter((child) => !isEmptyNode(child as DOMNode));
};

const hasNonEmptyContent = (nodes: DOMNode[]) => nodes.some((node) => !isEmptyNode(node));

// A paragraph's children, split into alternating segments of block-level
// macros and the plain inline content that surrounds them.
type PSegment = { kind: 'macro'; node: Element } | { kind: 'content'; nodes: DOMNode[] };

const splitParagraphChildren = (children: Element['children']): PSegment[] => {
    const segments: PSegment[] = [];
    let currentContent: DOMNode[] = [];

    const flushContent = () => {
        if (currentContent.length > 0) {
            segments.push({ kind: 'content', nodes: currentContent });
            currentContent = [];
        }
    };

    children.forEach((child) => {
        const domNode = child as DOMNode;
        if (isBlockLevelMacro(domNode)) {
            flushContent();
            segments.push({ kind: 'macro', node: domNode });
        } else {
            currentContent.push(domNode);
        }
    });
    flushContent();

    return segments;
};

type Props = {
    htmlProps: ProcessedHtmlProps | string;
    pSize?: 'large' | 'small';
    // Content to merge into the last rendered paragraph, e.g. inline text that
    // immediately followed this html-fragment macro on the same source line.
    appendContent?: React.ReactNode;
};

// Renders trailing/appended content as its own paragraph. Used as a fallback
// wherever the content it would normally be merged into fails to render.
const renderAppendContentFallback = (appendContent: React.ReactNode, pSize?: 'large' | 'small') => (
    <BodyLong key="appended-trailing-content" spacing size={pSize ?? 'medium'}>
        {appendContent}
    </BodyLong>
);

const isWhitespaceOnlyString = (node: React.ReactNode): node is string =>
    typeof node === 'string' && !node.trim();

// Finds the index of the last node that isn't a trailing whitespace-only text
// node, e.g. a stray newline between the last paragraph and the array's end.
// Returns -1 if the array is empty or contains only whitespace.
const findLastNonWhitespaceIndex = (nodes: React.ReactNode[]): number => {
    for (let i = nodes.length - 1; i >= 0; i--) {
        if (!isWhitespaceOnlyString(nodes[i])) {
            return i;
        }
    }
    return -1;
};

const isBodyLongElement = (
    node: React.ReactNode
): node is React.ReactElement<{ children?: React.ReactNode }> =>
    React.isValidElement<{ children?: React.ReactNode }>(node) && node.type === BodyLong;

// Appends content to the last top-level paragraph in the parsed html, so text
// that trails an html-fragment macro on the same line ends up inside the
// fragment's own last paragraph instead of becoming an orphaned text node.
// Falls back to a new paragraph if no paragraph is found to merge into.
const mergeAppendContentIntoLastParagraph = (
    parsedContent: ReturnType<typeof htmlReactParser>,
    appendContent: React.ReactNode,
    pSize?: 'large' | 'small'
): React.ReactNode => {
    const nodes = [...forceArray(parsedContent)];

    const lastIndex = findLastNonWhitespaceIndex(nodes);
    const lastNode = lastIndex >= 0 ? nodes[lastIndex] : undefined;

    if (!isBodyLongElement(lastNode)) {
        return [...nodes, renderAppendContentFallback(appendContent, pSize)];
    }

    nodes[lastIndex] = React.cloneElement(
        lastNode,
        undefined,
        <>
            {lastNode.props.children}
            {appendContent}
        </>
    );
    return nodes;
};

export const ParsedHtml = ({ htmlProps, pSize, appendContent }: Props) => {
    const { editorView, language } = usePageContentProps();

    if (!htmlProps) {
        return appendContent ? <>{renderAppendContentFallback(appendContent, pSize)}</> : null;
    }

    const { processedHtml, macros } =
        typeof htmlProps === 'string' ? { processedHtml: htmlProps, macros: [] } : htmlProps;

    if (!processedHtml) {
        return appendContent ? <>{renderAppendContentFallback(appendContent, pSize)}</> : null;
    }

    const parserOptions: HTMLReactParserOptions = {
        replace: (element: DOMNode) => {
            if (!isTag(element)) {
                return undefined;
            }

            const { name, attribs, children } = element;
            const tag = name?.toLowerCase();
            //Remove all inline styling except in table cells
            if (tag !== 'td') {
                delete attribs?.style;
            }
            const domNodes = children as DOMNode[];
            const props = !!attribs && attributesToProps(attribs);
            const validChildren = getNonEmptyChildren(element) as DOMNode[];
            const tagIsEmpty = validChildren.length === 0;

            // Handle macros
            if (tag === processedHtmlMacroTag) {
                return (
                    <MacroMapper
                        key={attribs?.['data-macro-ref']}
                        macros={macros}
                        macroRef={attribs?.['data-macro-ref']}
                    />
                );
            }

            // Remove img without src
            if (tag === 'img') {
                if (!attribs?.src) {
                    return <Fragment />;
                }
                return (
                    <NextImage
                        {...props}
                        alt={attribs.alt || ''}
                        src={getMediaUrl(attribs.src, !!editorView, language)}
                    />
                );
            }

            // Fix header-tags
            if (isHeadingTag(tag)) {
                // Header-tags should not be used as empty spacers
                if (tagIsEmpty) {
                    return <p>{''}</p>;
                }

                const level = tag === 'h1' ? '2' : headingToLevel[tag]; //Level 1 reserved for page heading
                const size = headingToSize[tag];

                // Ignore heading-tag if it contains a macro
                if (hasBlockLevelMacroChildren(element)) {
                    return <>{domToReact(domNodes, parserOptions)}</>;
                }

                return (
                    // H1 tags should only be used for the page heading
                    <Heading {...props} size={size} level={level} spacing>
                        {domToReact(validChildren, parserOptions)}
                    </Heading>
                );
            }

            // Handle paragraphs
            if (tag === 'p' && children) {
                // Block-level macros cannot be nested inside a <p>. Split the
                // paragraph's children around them instead, so surrounding inline
                // text still gets wrapped in its own paragraph rather than being
                // left dangling outside any wrapper.
                if (hasBlockLevelMacroChildren(element)) {
                    const segments = splitParagraphChildren(children);
                    let skipNextContentSegment = false;

                    return (
                        <>
                            {segments.map((segment, index) => {
                                if (segment.kind === 'content') {
                                    if (skipNextContentSegment) {
                                        skipNextContentSegment = false;
                                        return null;
                                    }

                                    if (!hasNonEmptyContent(segment.nodes)) {
                                        return null;
                                    }

                                    return (
                                        <BodyLong key={index} spacing size={pSize ?? 'medium'}>
                                            {domToReact(segment.nodes, parserOptions)}
                                        </BodyLong>
                                    );
                                }

                                // segment.kind === 'macro'
                                skipNextContentSegment = false;

                                const macroRef = segment.node.attribs?.['data-macro-ref'];
                                const macroName = segment.node.attribs?.['data-macro-name'];
                                const nextSegment = segments[index + 1];

                                // Html-fragment macros render their own paragraph(s), so
                                // inline text immediately following one on the same source
                                // line can be merged into the fragment's last paragraph
                                // instead of becoming an orphaned, unwrapped text node.
                                const trailingNodes =
                                    macroName === MacroType.HtmlFragment &&
                                    nextSegment?.kind === 'content' &&
                                    hasNonEmptyContent(nextSegment.nodes)
                                        ? nextSegment.nodes
                                        : undefined;

                                if (trailingNodes) {
                                    skipNextContentSegment = true;
                                    return (
                                        <MacroMapper
                                            key={macroRef}
                                            macros={macros}
                                            macroRef={macroRef}
                                            trailingContent={domToReact(
                                                trailingNodes,
                                                parserOptions
                                            )}
                                        />
                                    );
                                }

                                return (
                                    <Fragment key={macroRef ?? index}>
                                        {domToReact([segment.node] as DOMNode[], parserOptions)}
                                    </Fragment>
                                );
                            })}
                        </>
                    );
                }
                return (
                    <BodyLong spacing {...props} className={undefined} size={pSize ?? 'medium'}>
                        {domToReact(domNodes, parserOptions)}
                    </BodyLong>
                );
            }

            // Remove underline
            if (tag === 'u') {
                if (!children) {
                    return <Fragment />;
                }

                return <>{domToReact(domNodes, parserOptions)}</>;
            }

            // Handle links
            if (tag === 'a') {
                if (tagIsEmpty || typeof props.href !== 'string') {
                    return <Fragment />;
                }

                // Remove id to avoid duplicate ids in the DOM
                if (props.id) {
                    delete props.id;
                }

                return (
                    <LenkeInline
                        {...props}
                        href={props.href}
                        style={undefined}
                        className={undefined}
                    >
                        {domToReact(validChildren, parserOptions)}
                    </LenkeInline>
                );
            }

            // Remove empty lists and other tags that should not be empty
            switch (tag) {
                case 'ul':
                case 'ol':
                case 'dl':
                case 'div':
                case 'thead':
                    if (tagIsEmpty) {
                        return <Fragment />;
                    }
                    break;
            }

            // Handle li - remove if empty
            if (tag === 'li') {
                if (tagIsEmpty) {
                    return <Fragment />;
                }
                return (
                    <BodyLong {...props} as={'li'}>
                        {domToReact(validChildren, parserOptions)}
                    </BodyLong>
                );
            }

            // Table class fix, excluding large-table (statistics pages)
            if (tag === 'table' && attribs?.class !== 'statTab') {
                return <Table>{domToReact(validChildren, parserOptions)}</Table>;
            }

            // Replace empty rows with stylable element
            if (tag === 'tr' && tagIsEmpty) {
                return <tr {...props} role="none" className={'spacer-row'} />;
            }
        },
    };

    const htmlParsed = htmlReactParser(processedHtml, parserOptions);
    const content = appendContent
        ? mergeAppendContentIntoLastParagraph(htmlParsed, appendContent, pSize)
        : htmlParsed;

    // If the html renders to an empty string (or whitespace only), show an
    // error message in the editor
    if (editorView === 'edit') {
        const htmlRaw = ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>{content}</Provider>
        ).trim();

        if (!htmlRaw) {
            return (
                <EditorHelp
                    text={"HTML'en er tom eller inneholder feil."}
                    globalWarningText={'Feil på riktekst/HTML-komponent'}
                    type={'error'}
                />
            );
        }
    }

    return <>{content}</>;
};
