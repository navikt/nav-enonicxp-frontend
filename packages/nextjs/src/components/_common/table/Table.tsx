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
const TableComponent = ({ children }: Props) => {
    const { shadeOnHover } = useContext(TableContext);

    const elements = React.Children.map(children as React.ReactElement, (child: ReactElement) => {
        const { type } = child;
        const props = child.props as any;

        switch (type) {
            case 'thead':
                return (
                    <DsTable.Header {...props}>
                        <TableComponent>{props.children}</TableComponent>
                    </DsTable.Header>
                );
            case 'tbody':
                return (
                    <DsTable.Body {...props}>
                        <TableComponent>{props.children}</TableComponent>
                    </DsTable.Body>
                );
            case 'th':
                return (
                    <DsTable.HeaderCell {...props}>
                        <TableComponent>{props.children}</TableComponent>
                    </DsTable.HeaderCell>
                );
            case 'tr':
                return (
                    <DsTable.Row {...props} shadeOnHover={shadeOnHover}>
                        <TableComponent>{props.children}</TableComponent>
                    </DsTable.Row>
                );
            case 'td':
                return (
                    <DsTable.DataCell {...props}>
                        <TableComponent>{props.children}</TableComponent>
                    </DsTable.DataCell>
                );
            default:
                return child;
        }
    });

    return <>{elements}</>;
};

export const Table = ({ children, zebraStripes = true, shadeOnHover = true, ...rest }: Props) => {
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
                    <TableComponent>{children}</TableComponent>
                </DsTable>
            </TableContext.Provider>
        </div>
    );
};
