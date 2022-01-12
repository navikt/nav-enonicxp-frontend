import React from 'react';
import {
    Element,
    domToReact,
    Node,
    HTMLReactParserOptions,
} from 'html-react-parser';
import { Table } from '@navikt/ds-react';
import { BEM } from '../../../utils/classnames';
import { EditorHelp } from '../editor-utils/editor-help/EditorHelp';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';

const bem = BEM('parsed-html-table');

type Props = {
    tableElements: Node[];
    parentParserOptions: HTMLReactParserOptions;
} & React.TableHTMLAttributes<HTMLTableElement>;

export const ParsedHtmlTable = ({
    tableElements,
    parentParserOptions,
    ...rest
}: Props) => {
    if (!tableElements?.length) {
        return <EditorHelp text={'Tom tabell'} />;
    }

    const parserOptions = {
        replace: (element: Element) => {
            const { name, attribs, children } = element;
            const tag = name?.toLowerCase();
            const props = !!attribs && attributesToProps(attribs);

            if (tag === 'td') {
                return (
                    <Table.DataCell {...props}>
                        {domToReact(children, parentParserOptions)}
                    </Table.DataCell>
                );
            }

            if (tag === 'tr') {
                return (
                    <Table.Row {...props}>
                        {domToReact(children, parserOptions)}
                    </Table.Row>
                );
            }

            if (tag === 'th') {
                return (
                    <Table.HeaderCell {...props}>
                        {domToReact(children, parserOptions)}
                    </Table.HeaderCell>
                );
            }

            if (tag === 'thead') {
                return (
                    <Table.Header {...props}>
                        {domToReact(children, parserOptions)}
                    </Table.Header>
                );
            }

            if (tag === 'tbody') {
                return (
                    <Table.Body {...props}>
                        {domToReact(children, parserOptions)}
                    </Table.Body>
                );
            }

            return children && <>{domToReact(children, parentParserOptions)}</>;
        },
    };

    return (
        <div className={bem()}>
            <Table {...rest} role={'presentation'} zebraStripes={true}>
                {domToReact(tableElements, parserOptions)}
            </Table>
        </div>
    );
};
