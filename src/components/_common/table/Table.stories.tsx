import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
    component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const format = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${d}.${m}.${y}`;
};

const data = [
    {
        name: 'Jakobsen, Markus',
        start: '2021-04-28T19:12:14.358Z',
        slutt: '2021-05-30T19:12:14.358Z',
    },
    {
        name: 'Halvorsen, Mari',
        start: '2022-01-29T09:51:19.833Z',
        slutt: '2024-01-01T09:51:19.833Z',
    },
    {
        name: 'Christiansen, Mathias',
        start: '2021-06-04T20:57:29.159Z',
        slutt: '2022-02-04T20:57:29.159Z',
    },
    {
        name: 'Fredriksen, Leah',
        start: '2021-08-31T15:47:36.293Z',
        slutt: '2021-08-12T20:57:29.159Z',
    },
    {
        name: 'Evensen, Jonas',
        start: '2021-07-17T11:13:26.116Z',
        slutt: '2024-06-08T20:57:29.159Z',
    },
];

export const Default: Story = {
    args: {
        children: (
            <Table>
                <thead>
                    <tr>
                        <th scope="col">Navn</th>
                        <th scope="col">Startdato</th>
                        <th scope="col">Sluttdato</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ name, start, slutt }, i) => {
                        return (
                            <tr key={i + slutt}>
                                <td scope="row">{name}</td>
                                <td>{format(new Date(start))}</td>
                                <td>{format(new Date(slutt))}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        ),
    },
};
