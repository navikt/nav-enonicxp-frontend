import type { Meta, StoryObj } from '@storybook/react';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FormDetailsData } from 'types/content-props/form-details';

const meta = {
    component: FormDetails,
} satisfies Meta<typeof FormDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const formDetails: FormDetailsData = {
    title: 'Tittel',
    formNumbers: ['1', '2', '3'],
    formType: [],
    alerts: [],
};

export const Default: Story = {
    args: {
        formDetails: formDetails,
        displayConfig: { showTitle: true, showIngress: true, showFormNumbers: true },
        formNumberSelected: '2',
    },
};
