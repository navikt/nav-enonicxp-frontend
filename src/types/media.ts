import { XpResponseProps } from 'utils/fetch/fetch-content';
import { ContentAndMediaCommonProps } from './content-props/_content-common';

export enum MediaType {
    Archive = 'media:archive',
    Audio = 'media:audio',
    Code = 'media:code',
    Data = 'media:data',
    Document = 'media:document',
    Executable = 'media:executable',
    Image = 'media:image',
    Presentation = 'media:presentation',
    Spreadsheet = 'media:spreadsheet',
    Text = 'media:text',
    Unknown = 'media:unknown',
    Vector = 'media:vector',
    Video = 'media:video',
}

export type MediaProps = {
    type: MediaType;
    mediaUrl: string;
} & ContentAndMediaCommonProps;

export type VectorImage = {
    type: MediaType.Vector;
    mediaUrl?: string;
};

export type RasterImage = {
    type: MediaType.Image;
    imageUrl?: string;
    mediaUrl?: string;
    imageInfo?: {
        imageWidth: number;
        imageHeight: number;
        contentType: string;
    };
};

export type XpImageProps = VectorImage | RasterImage;

export const isMediaContent = (content: XpResponseProps): content is MediaProps =>
    Object.values(MediaType).includes(content.type as MediaType);
