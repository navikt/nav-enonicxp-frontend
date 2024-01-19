import React, { ReactElement, useContext, useMemo } from 'react';
import { Table as DsTable, TableProps } from '@navikt/ds-react';

import style from './Table.module.scss';

type TableContextProps = { shadeOnHover?: boolean };

type Props = {
    children: React.ReactNode;
} & TableProps &
    TableContextProps;

const TableContext = React.createContext<TableContextProps>({});

// Recursively transforms table element children to matching ds-react components
const TableComponent = ({ element }: { element?: React.ReactNode }) => {
    const { shadeOnHover } = useContext(TableContext);

    const children = React.Children.map(element, (child: ReactElement) => {
        const { type, props } = child;

        switch (type) {
            case 'thead':
                return (
                    <DsTable.Header {...props}>
                        <TableComponent element={props.children} />
                    </DsTable.Header>
                );
            case 'tbody':
                return (
                    <DsTable.Body {...props}>
                        <TableComponent element={props.children} />
                    </DsTable.Body>
                );
            case 'th':
                return (
                    <DsTable.HeaderCell {...props}>
                        <TableComponent element={props.children} />
                    </DsTable.HeaderCell>
                );
            case 'tr':
                return (
                    <DsTable.Row {...props} shadeOnHover={shadeOnHover}>
                        <TableComponent element={props.children} />
                    </DsTable.Row>
                );
            case 'td':
                return (
                    <DsTable.DataCell {...props}>
                        <TableComponent element={props.children} />
                    </DsTable.DataCell>
                );
            default:
                return child;
        }
    });

    return <>{children}</>;
};

export const Table = ({
    children,
    zebraStripes = true,
    shadeOnHover = true,
    ...rest
}: Props) => {
    const context = useMemo<TableContextProps>(
        () => ({
            shadeOnHover,
        }),
        [shadeOnHover]
    );

    return (
        <div className={style.tableWrapper}>
            <TableContext.Provider value={context}>
                <DsTable {...rest} zebraStripes={zebraStripes}>
                    <TableComponent element={children} />
                </DsTable>
            </TableContext.Provider>
        </div>
    );
};
