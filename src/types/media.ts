import { XpResponseProps } from '../utils/fetch-content';
import { ContentCommonProps } from './content-props/_content-common';

export enum MediaType {
    Archive = 'media_Archive',
    Audio = 'media_Audio',
    Code = 'media_Code',
    Data = 'media_Data',
    Document = 'media_Document',
    Executable = 'media_Executable',
    Image = 'media_Image',
    Presentation = 'media_Presentation',
    Spreadsheet = 'media_Spreadsheet',
    Text = 'media_Text',
    Unknown = 'media_Unknown',
    Vector = 'media_Vector',
    Video = 'media_Video',
}

export type MediaProps = {
    __typename: MediaType;
    mediaUrl: string;
} & ContentCommonProps;

export type VectorImage = {
    __typename: MediaType.Vector;
    mediaUrl?: string;
};

export type BitmapImage = {
    __typename: MediaType.Image;
    imageUrl?: string;
    mediaUrl?: string;
    imageInfo?: {
        imageWidth: number;
        imageHeight: number;
        contentType: string;
    };
};

export type XpImageProps = VectorImage | BitmapImage;

export const isMediaContent = (
    content: XpResponseProps
): content is MediaProps =>
    Object.values(MediaType).includes(content.__typename as MediaType);
