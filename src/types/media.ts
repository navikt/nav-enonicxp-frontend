import { XpContentRef } from '../utils/paths';
import { Language } from '../translations';

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
    _id: XpContentRef;
    _path: XpContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    language: Language;
    publish?: {
        first?: string;
        from?: string;
    };
    mediaUrl: string;
};

export type VectorImage = {
    __typename: MediaType.Vector;
    mediaUrl?: string;
};

export type BitmapImage = {
    __typename: MediaType.Image;
    imageUrl?: string;
    mediaUrl?: string;
};

export type XpImage = VectorImage | BitmapImage;
