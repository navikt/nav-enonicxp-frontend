import React, { ReactElement } from 'react';
import { Table as DsTable, TableProps } from '@navikt/ds-react';
import style from './Table.module.scss';

type Props = {
    children: React.ReactNode;
} & TableProps;

const getTableComponent = (type: string) => {
    switch (type) {
        case 'thead':
            return DsTable.Header;
        case 'tbody':
            return DsTable.Body;
        case 'th':
            return DsTable.HeaderCell;
        case 'tr':
            return DsTable.Row;
        case 'td':
            return DsTable.DataCell;
        default:
            return null;
    }
};

// Recursively transforms table element children to matching ds-react components
const TableElement = ({ element }: { element?: React.ReactNode }) => {
    const children = React.Children.map(element, (child) => {
        const { type, props } = child as ReactElement;

        const TableComponent = getTableComponent(type?.toString());

        if (TableComponent) {
            return (
                <TableComponent {...props}>
                    <TableElement element={props.children} />
                </TableComponent>
            );
        }

        return child;
    });

    return <>{children}</>;
};

export const Table = ({ children, zebraStripes = true, ...rest }: Props) => {
    return (
        <div className={style.tableWrapper}>
            <DsTable {...rest} zebraStripes={zebraStripes}>
                <TableElement element={children} />
            </DsTable>
        </div>
    );
};
