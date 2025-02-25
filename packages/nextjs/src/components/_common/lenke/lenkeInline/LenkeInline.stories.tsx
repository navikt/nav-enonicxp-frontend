import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

const meta = {
    component: LenkeInline,
    args: { children: 'Trykk her', href: '/' },
} satisfies Meta<typeof LenkeInline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return (
            <BodyLong>
                Incididunt laborum nisi nisi Lorem{' '}
                <LenkeInline href={'/'}>Ex aliqua incididunt</LenkeInline> in. Laborum aute fugiat
                officia adipisicing non veniam dolor nulla non ex consectetur fugiat eiusmod aute.
                Culpa sit aute est duis minim in in voluptate velit fugiat. Laboris est id deserunt
                ut ea Lorem eu. Esse elit laboris aute commodo sint laborum fugiat aliqua.
            </BodyLong>
        );
    },
};
