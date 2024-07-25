import type { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
// import { getAudience } from 'types/component-props/_mixins';
// import { usePageContentProps } from 'store/pageContext';
import { FrontpageShortcutsPart } from './FrontpageShortcutsPart';

const meta = {
    title: 'Components/Parts/FrontpageShortcutsPart',
    component: FrontpageShortcutsPart,
} satisfies Meta<typeof FrontpageShortcutsPart>;

export default meta;
type Story = StoryObj<typeof meta>;

// const pageProps = usePageContentProps();
// const audience = getAudience(pageProps.data?.audience);

export const Default: Story = {
    args: {
        path: 'test',
        type: ComponentType.Part,
        descriptor: PartType.FrontpageShortcuts,
        config: {
            shortcuts: [
                {
                    target: {
                        _path: 'string',
                        displayName: 'string',
                        data: {
                            // url?: "string",
                            // illustration?: PictogramsProps;
                            // title?: "string",
                        },
                    },
                    customTitle: 'Custom title',
                },
            ],
        },
    },
};
