import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { htmlAreaPart } from 'components/pages/_storyMocks';
import { withStore } from 'components/pages/_storyDecorators';
import { CurrentTopicPage } from './CurrentTopicPage';

const meta = {
    component: CurrentTopicPage,
    decorators: [withStore],
    args: {
        _id: 'story-current-topic-page-id',
        _path: '/www.nav.no/no/nav-og-samfunn/aktuelt-tema',
        createdTime: '2023-03-15T09:00:00.000Z',
        modifiedTime: '2026-01-20T12:30:00.000Z',
        type: ContentType.CurrentTopicPage,
        displayName: 'Aktuelt tema',
        language: 'no',
        data: {
            title: 'Aktuelt tema',
        },
        page: {
            type: ComponentType.Page,
            path: '/',
            descriptor: LayoutType.SingleColPage,
            config: {},
            regions: {
                pageContent: {
                    components: [
                        htmlAreaPart(
                            '<p>I perioden mai-juni 2025 gjennomører Nav personbrukerunderskøkelsen.</p>\n'
                        ),
                        htmlAreaPart(
                            '<p>Personbrukere av Nav er tilfeldig trukket ut fra Navs registre til å delta. Spørreundersøkelsen gjennomføres av Lysio Research (tidligere Enkätfabriken).</p>\n\n<p>Har du mottatt invitasjonsbrev i Digipost eller i postkassen, eller en påminnelse på e-post om deltakelse i personbrukerundersøkelsen, kan du svare digitalt ved å bruke lenken som står i brevet.'
                        ),
                    ],
                    name: 'pageContent',
                },
            },
        },
        publish: {
            from: '2023-03-15T09:00:00.000Z',
            first: '2023-03-15T09:00:00.000Z',
        },
    },
} satisfies Meta<typeof CurrentTopicPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
