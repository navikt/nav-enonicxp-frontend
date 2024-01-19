import React, { ReactElement, useContext } from 'react';
import { Table as DsTable, TableProps } from '@navikt/ds-react';

import style from './Table.module.scss';

type TableContextProps = { shadeOnHover?: boolean };

type Props = {
    children: React.ReactNode;
} & TableProps &
    TableContextProps;

const TableContext = React.createContext<TableContextProps>({});

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
    const { shadeOnHover } = useContext(TableContext);

    const children = React.Children.map(element, (child) => {
        const { type, props } = child as ReactElement;

        const TableComponent = getTableComponent(type?.toString());

        if (!TableComponent) {
            return child;
        }

        return (
            <TableComponent
                {...props}
                shadeOnHover={type === 'tr' ? shadeOnHover : undefined}
            >
                <TableElement element={props.children} />
            </TableComponent>
        );
    });

    return <>{children}</>;
};

export const Table = ({
    children,
    zebraStripes = true,
    shadeOnHover = true,
    ...rest
}: Props) => {
    return (
        <div className={style.tableWrapper}>
            <TableContext.Provider value={{ shadeOnHover }}>
                <DsTable {...rest} zebraStripes={zebraStripes}>
                    <TableElement element={children} />
                </DsTable>
            </TableContext.Provider>
        </div>
    );
};
