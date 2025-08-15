import type { Meta, StoryObj } from '@storybook/react';
import { MediaType, RasterImage } from 'types/media';
import { XpImage } from './XpImage';

const defaultImage: RasterImage = {
    type: MediaType.Image,
    mediaUrl: 'https://picsum.photos/400/300',
    imageUrl: 'https://picsum.photos/400/300',
    imageInfo: {
        imageWidth: 400,
        imageHeight: 300,
        contentType: 'image/jpeg',
    },
};

const meta: Meta<typeof XpImage> = {
    title: 'Common/Image/XpImage',
    component: XpImage,
    parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof XpImage>;

export const Default: Story = {
    args: {
        imageProps: defaultImage,
        alt: 'A beautiful landscape image',
    },
};
