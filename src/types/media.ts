export type VectorImage = {
    __typename: 'media_Vector';
    mediaUrl?: string;
};

export type BitmapImage = {
    __typename: 'media_Image';
    imageUrl?: string;
    mediaUrl?: string;
};

export type XpImageProps = VectorImage | BitmapImage;
