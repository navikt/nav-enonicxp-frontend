import type { Meta, StoryObj } from '@storybook/react';

import { PageContextProvider } from 'store/pageContext';
import { Audience } from 'types/component-props/_mixins';
import { GeneralPageHeaderTagLine } from './GeneralPageHeaderTagLine';

// eslint-disable-next-line react/display-name
const withMockedPageContent = (audience: Audience) => (Story: any) => (
    <PageContextProvider
        content={{
            data: {
                audience: {
                    _selected: audience,
                    [Audience.PERSON]: {},
                    [Audience.EMPLOYER]: {},
                    [Audience.PROVIDER]: {},
                },
            },
        }}
    >
        <Story />
    </PageContextProvider>
);

const meta = {
    component: GeneralPageHeaderTagLine,
    args: {
        tagLine: 'Tagline',
    },
} satisfies Meta<typeof GeneralPageHeaderTagLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Person: Story = {
    decorators: [withMockedPageContent(Audience.PERSON)],
};

export const Employer: Story = {
    decorators: [withMockedPageContent(Audience.EMPLOYER)],
};

export const Provider: Story = {
    decorators: [withMockedPageContent(Audience.PROVIDER)],
};

export const UndefinedAudience: Story = {
    decorators: [withMockedPageContent('Something' as Audience)],
};
